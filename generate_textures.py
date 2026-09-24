#!/usr/bin/env python3
"""
Generate realistic cognac pebbled leather PBR textures:
1. Diffuse / BaseColor (Rich cognac with micro-pebble tonal variation)
2. Normal Map (Cellular Voronoi pebbled leather bump normals)
3. Roughness Map (Pebble peaks slightly lustrous, crevices slightly rougher)
"""

import math
import random
import struct
import zlib
import os

def write_png(filename, width, height, rgb_bytes):
    raw_data = bytearray()
    for y in range(height):
        raw_data.append(0) # filter type 0 (None)
        row_start = y * width * 3
        raw_data.extend(rgb_bytes[row_start : row_start + width * 3])
    
    compressed = zlib.compress(bytes(raw_data), 9)
    
    def chunk(chunk_type, data):
        c = chunk_type + data
        crc = struct.pack('>I', zlib.crc32(c) & 0xffffffff)
        return struct.pack('>I', len(data)) + c + crc
    
    header = b'\x89PNG\r\n\x1a\n'
    ihdr = chunk(b'IHDR', struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0))
    idat = chunk(b'IDAT', compressed)
    iend = chunk(b'IEND', b'')
    
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    with open(filename, 'wb') as f:
        f.write(header + ihdr + idat + iend)
    print(f"Generated {filename} ({width}x{height}, {os.path.getsize(filename)} bytes)")

def generate_leather_pbr(size=512, grid_cells=32):
    random.seed(42)
    # Generate jittered grid points for seamless Voronoi cellular texture
    cell_size = size / grid_cells
    points = []
    for gy in range(grid_cells):
        row = []
        for gx in range(grid_cells):
            px = (gx + 0.5 + (random.random() - 0.5) * 0.7) * cell_size
            py = (gy + 0.5 + (random.random() - 0.5) * 0.7) * cell_size
            row.append((px, py))
        points.append(row)

    height_map = [0.0] * (size * size)

    # Compute Worley / cellular distance for each pixel
    for y in range(size):
        for x in range(size):
            gx = int(x / cell_size)
            gy = int(y / cell_size)
            min_dist = 1e9
            second_dist = 1e9

            # Check 3x3 neighboring cells with toroidal wrapping for seamless tiling
            for dy in (-1, 0, 1):
                for dx in (-1, 0, 1):
                    nx = (gx + dx) % grid_cells
                    ny = (gy + dy) % grid_cells
                    pt = points[ny][nx]
                    px = pt[0] + dx * size if (gx + dx) != nx else pt[0]
                    # compute wrapped delta
                    dx_pixel = abs(x - pt[0])
                    if dx_pixel > size / 2:
                        dx_pixel = size - dx_pixel
                    dy_pixel = abs(y - pt[1])
                    if dy_pixel > size / 2:
                        dy_pixel = size - dy_pixel
                    d = math.sqrt(dx_pixel * dx_pixel + dy_pixel * dy_pixel)
                    if d < min_dist:
                        second_dist = min_dist
                        min_dist = d
                    elif d < second_dist:
                        second_dist = d

            # Cell ridge metric: difference between second closest and closest
            # Produces rounded pillowed pebble domes with recessed crevices
            normalized_cell_rad = cell_size * 0.5
            cell_shape = max(0.0, 1.0 - (min_dist / normalized_cell_rad))
            cell_shape = math.sqrt(cell_shape) # dome curve
            
            # Crevice groove depth
            groove = min(1.0, (second_dist - min_dist) / (cell_size * 0.25))
            groove = math.pow(groove, 0.6)

            h = cell_shape * 0.7 + groove * 0.3
            height_map[y * size + x] = h

    diffuse_bytes = bytearray(size * size * 3)
    normal_bytes = bytearray(size * size * 3)
    roughness_bytes = bytearray(size * size * 3)

    # Cognac leather base color:
    # Highlights: #B56C36 (181, 108, 54)
    # Midtones:   #9C5325 (156, 83, 37)
    # Crevices:   #753B17 (117, 59, 23)
    
    strength = 3.5 # normal map bump intensity

    for y in range(size):
        for x in range(size):
            idx = y * size + x
            h = height_map[idx]

            # Neighbor samples for normal map (with wrap)
            x_prev = (x - 1 + size) % size
            x_next = (x + 1) % size
            y_prev = (y - 1 + size) % size
            y_next = (y + 1) % size

            dh_dx = (height_map[y * size + x_next] - height_map[y * size + x_prev]) * strength
            dh_dy = (height_map[y_next * size + x] - height_map[y_prev * size + x]) * strength

            # Normal vector: [-dh_dx, -dh_dy, 1.0] normalized
            norm_len = math.sqrt(dh_dx * dh_dx + dh_dy * dh_dy + 1.0)
            nx = (-dh_dx / norm_len)
            ny = (-dh_dy / norm_len)
            nz = (1.0 / norm_len)

            # Map normal [-1, 1] to [0, 255]
            normal_bytes[idx * 3 + 0] = int(min(255, max(0, (nx * 0.5 + 0.5) * 255)))
            normal_bytes[idx * 3 + 1] = int(min(255, max(0, (ny * 0.5 + 0.5) * 255)))
            normal_bytes[idx * 3 + 2] = int(min(255, max(0, (nz * 0.5 + 0.5) * 255)))

            # Diffuse color interpolation based on pebble height & micro-crevice
            # Deep crevice gives natural shadows
            t = min(1.0, max(0.0, h))
            r = int(120 + t * 65) # 120 -> 185
            g = int(60 + t * 48)  # 60 -> 108
            b = int(24 + t * 30)  # 24 -> 54
            diffuse_bytes[idx * 3 + 0] = min(255, r)
            diffuse_bytes[idx * 3 + 1] = min(255, g)
            diffuse_bytes[idx * 3 + 2] = min(255, b)

            # Roughness map:
            # Pebble tops are slightly smoother from handling (roughness ~0.58)
            # Crevices are slightly more matte (roughness ~0.76)
            rough = int(195 - t * 45) # 195 (0.76) -> 150 (0.58)
            roughness_bytes[idx * 3 + 0] = rough
            roughness_bytes[idx * 3 + 1] = rough
            roughness_bytes[idx * 3 + 2] = rough

    return diffuse_bytes, normal_bytes, roughness_bytes

if __name__ == '__main__':
    print("Synthesizing seamless cognac pebbled leather PBR textures...")
    size = 512
    diffuse, normal, roughness = generate_leather_pbr(size=size, grid_cells=28)

    # Save to public directory for WebGL app and model references
    write_png("public/models/textures/leather_cognac_diffuse.png", size, size, diffuse)
    write_png("public/models/textures/leather_cognac_normal.png", size, size, normal)
    write_png("public/models/textures/leather_cognac_roughness.png", size, size, roughness)

    # Also save to current directory for relative OBJ/MTL access
    write_png("textures/leather_cognac_diffuse.png", size, size, diffuse)
    write_png("textures/leather_cognac_normal.png", size, size, normal)
    write_png("textures/leather_cognac_roughness.png", size, size, roughness)
    print("All textures created successfully!")
