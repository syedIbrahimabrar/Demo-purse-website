#!/usr/bin/env python3
"""
Convert procedural bag.obj into:
1. Improved, high-fidelity OBJ + MTL with vertex normals (vn) and UV texture coords (vt)
2. Standalone GLB (glTF 2.0 Binary) with embedded PBR materials and textures
"""

import json
import math
import os
import struct

def compute_normals_and_uvs():
    with open('bag.obj') as f:
        lines = f.readlines()

    verts = []
    faces = []
    for line in lines:
        if line.startswith('v '):
            verts.append([float(x) for x in line.split()[1:4]])
        elif line.startswith('f '):
            faces.append([int(x.split('/')[0]) for x in line.split()[1:4]])

    print(f"Loaded bag.obj: {len(verts)} vertices, {len(faces)} faces")

    # Split into Comp 1 (Leather Body & Strap) and Comp 2 (Hardware Buckle)
    # Vertices 1..4986: Comp 1, 4987..5378: Comp 2
    comp1_v_count = 4986
    comp1_verts = verts[:comp1_v_count]
    comp2_verts = verts[comp1_v_count:]

    comp1_faces = [f for f in faces if all(idx <= comp1_v_count for idx in f)]
    # adjust indices for comp 2 to be 1-based relative to comp2_verts
    comp2_faces = [[idx - comp1_v_count for idx in f] for f in faces if all(idx > comp1_v_count for idx in f)]

    print(f"Comp 1 (Leather): {len(comp1_verts)} vertices, {len(comp1_faces)} faces")
    print(f"Comp 2 (Gold Hardware): {len(comp2_verts)} vertices, {len(comp2_faces)} faces")

    def calc_normals(v_list, f_list):
        n_accum = [[0.0, 0.0, 0.0] for _ in v_list]
        for f in f_list:
            i0, i1, i2 = f[0]-1, f[1]-1, f[2]-1
            p0, p1, p2 = v_list[i0], v_list[i1], v_list[i2]
            # Cross product
            ux, uy, uz = p1[0]-p0[0], p1[1]-p0[1], p1[2]-p0[2]
            vx, vy, vz = p2[0]-p0[0], p2[1]-p0[1], p2[2]-p0[2]
            nx = uy*vz - uz*vy
            ny = uz*vx - ux*vz
            nz = ux*vy - uy*vx
            area = math.sqrt(nx*nx + ny*ny + nz*nz)
            if area > 1e-8:
                for idx in (i0, i1, i2):
                    n_accum[idx][0] += nx
                    n_accum[idx][1] += ny
                    n_accum[idx][2] += nz

        normals = []
        for n in n_accum:
            mag = math.sqrt(n[0]*n[0] + n[1]*n[1] + n[2]*n[2])
            if mag > 1e-8:
                normals.append([n[0]/mag, n[1]/mag, n[2]/mag])
            else:
                normals.append([0.0, 1.0, 0.0])
        return normals

    comp1_normals = calc_normals(comp1_verts, comp1_faces)
    comp2_normals = calc_normals(comp2_verts, comp2_faces)

    # UV Mapping
    # Comp 1: Conformal mapping for leather body with grain repetition
    xs = [v[0] for v in comp1_verts]
    ys = [v[1] for v in comp1_verts]
    zs = [v[2] for v in comp1_verts]
    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)
    min_z, max_z = min(zs), max(zs)
    span_x = max_x - min_x
    span_z = max_z - min_z

    comp1_uvs = []
    uv_repeat = 3.5 # scale of pebbled grain across the bag
    for v in comp1_verts:
        # Front vs back mapping with seamless wrap across depth Y
        u = ((v[0] - min_x) / span_x) * uv_repeat
        # incorporate subtle depth offset so side gussets and seams flow naturally
        w = (v[2] - min_z) / span_z
        v_coord = w * uv_repeat + (v[1] / 24.0) * 0.35
        comp1_uvs.append([round(u, 5), round(v_coord, 5)])

    # Comp 2: Cylindrical unwrap around buckle ring
    comp2_xs = [v[0] for v in comp2_verts]
    comp2_ys = [v[1] for v in comp2_verts]
    comp2_zs = [v[2] for v in comp2_verts]
    c_cx = sum(comp2_xs) / len(comp2_xs)
    c_cz = sum(comp2_zs) / len(comp2_zs)

    comp2_uvs = []
    for v in comp2_verts:
        ang = math.atan2(v[2] - c_cz, v[0] - c_cx)
        u = (ang + math.pi) / (2 * math.pi)
        v_coord = (v[1] - min(comp2_ys)) / (max(comp2_ys) - min(comp2_ys) + 1e-5)
        comp2_uvs.append([round(u, 5), round(v_coord, 5)])

    return {
        'comp1': {
            'verts': comp1_verts,
            'normals': comp1_normals,
            'uvs': comp1_uvs,
            'faces': comp1_faces
        },
        'comp2': {
            'verts': comp2_verts,
            'normals': comp2_normals,
            'uvs': comp2_uvs,
            'faces': comp2_faces
        }
    }

def export_obj_and_mtl(mesh_data, obj_path, mtl_path):
    c1 = mesh_data['comp1']
    c2 = mesh_data['comp2']

    # MTL file
    with open(mtl_path, 'w') as f:
        f.write("# AURELIS Luxury Hobo Bag Material Definition\n\n")
        f.write("newmtl Leather_Cognac_Pebbled\n")
        f.write("Ka 1.0 1.0 1.0\n")
        f.write("Kd 0.62 0.35 0.16\n") # Cognac brown
        f.write("Ks 0.25 0.25 0.25\n")
        f.write("Ns 45.0\n")
        f.write("d 1.0\n")
        f.write("illum 2\n")
        f.write("map_Kd textures/leather_cognac_diffuse.png\n")
        f.write("map_Bump textures/leather_cognac_normal.png\n")
        f.write("map_Ns textures/leather_cognac_roughness.png\n\n")

        f.write("newmtl Hardware_Gold\n")
        f.write("Ka 1.0 1.0 1.0\n")
        f.write("Kd 0.90 0.76 0.47\n") # Polished luxury gold
        f.write("Ks 0.95 0.90 0.70\n")
        f.write("Ns 160.0\n")
        f.write("d 1.0\n")
        f.write("illum 2\n")

    # OBJ file
    with open(obj_path, 'w') as f:
        f.write("# AURELIS Luxury Hobo Bag 3D Model\n")
        f.write("# Improved with Area-Weighted Smooth Normals, UV Mapping, and PBR Materials\n")
        f.write(f"mtllib {os.path.basename(mtl_path)}\n\n")

        # Vertices: Comp 1 then Comp 2
        for v in c1['verts']:
            f.write(f"v {v[0]:.4f} {v[1]:.4f} {v[2]:.4f}\n")
        for v in c2['verts']:
            f.write(f"v {v[0]:.4f} {v[1]:.4f} {v[2]:.4f}\n")

        # UVs
        for uv in c1['uvs']:
            f.write(f"vt {uv[0]:.4f} {uv[1]:.4f}\n")
        for uv in c2['uvs']:
            f.write(f"vt {uv[0]:.4f} {uv[1]:.4f}\n")

        # Normals
        for n in c1['normals']:
            f.write(f"vn {n[0]:.4f} {n[1]:.4f} {n[2]:.4f}\n")
        for n in c2['normals']:
            f.write(f"vn {n[0]:.4f} {n[1]:.4f} {n[2]:.4f}\n")

        # Mesh 1: Leather Body & Strap
        f.write("\no HoboBag_Body\n")
        f.write("usemtl Leather_Cognac_Pebbled\n")
        f.write("s 1\n")
        for face in c1['faces']:
            f.write(f"f {face[0]}/{face[0]}/{face[0]} {face[1]}/{face[1]}/{face[1]} {face[2]}/{face[2]}/{face[2]}\n")

        # Mesh 2: Gold Hardware Buckle
        offset = len(c1['verts'])
        f.write("\no HoboBag_Hardware_Buckle\n")
        f.write("usemtl Hardware_Gold\n")
        f.write("s 2\n")
        for face in c2['faces']:
            i0 = face[0] + offset
            i1 = face[1] + offset
            i2 = face[2] + offset
            f.write(f"f {i0}/{i0}/{i0} {i1}/{i1}/{i1} {i2}/{i2}/{i2}\n")

    print(f"Exported OBJ: {obj_path} ({os.path.getsize(obj_path)} bytes)")
    print(f"Exported MTL: {mtl_path}")

def export_glb(mesh_data, glb_path):
    """
    Construct a complete, self-contained glTF 2.0 Binary (GLB) file.
    In glTF standard:
    Units: meters (scale 0.001 to convert mm to meters)
    Axes: Y is Up, Z is Forward (convert X->X, Y->Z, Z->-Y or standard CAD transform)
    For seamless alignment with WebGL:
    X_gltf = X * 0.001
    Y_gltf = Z * 0.001 (height is Y-up in glTF)
    Z_gltf = -Y * 0.001 (depth is Z in glTF)
    """
    c1 = mesh_data['comp1']
    c2 = mesh_data['comp2']

    scale = 0.001 # mm to meters

    # Helper to pack binary data aligned to 4 bytes
    bin_buffer = bytearray()

    def add_to_buffer(data_bytes):
        offset = len(bin_buffer)
        bin_buffer.extend(data_bytes)
        # Pad to 4-byte boundary
        while len(bin_buffer) % 4 != 0:
            bin_buffer.append(0)
        return offset, len(data_bytes)

    # 1. Comp 1 Position buffer (float32 x 3)
    c1_pos_bytes = bytearray()
    c1_xs = [v[0] * scale for v in c1['verts']]
    c1_ys = [v[2] * scale for v in c1['verts']] # Z_cad -> Y_gltf
    c1_zs = [-v[1] * scale for v in c1['verts']] # -Y_cad -> Z_gltf
    for x, y, z in zip(c1_xs, c1_ys, c1_zs):
        c1_pos_bytes.extend(struct.pack('<fff', x, y, z))
    bv_c1_pos = add_to_buffer(c1_pos_bytes)

    # 2. Comp 1 Normal buffer (float32 x 3)
    c1_n_bytes = bytearray()
    for n in c1['normals']:
        nx = n[0]
        ny = n[2]  # Z -> Y
        nz = -n[1] # -Y -> Z
        c1_n_bytes.extend(struct.pack('<fff', nx, ny, nz))
    bv_c1_norm = add_to_buffer(c1_n_bytes)

    # 3. Comp 1 UV buffer (float32 x 2)
    c1_uv_bytes = bytearray()
    for uv in c1['uvs']:
        c1_uv_bytes.extend(struct.pack('<ff', uv[0], 1.0 - uv[1]))
    bv_c1_uv = add_to_buffer(c1_uv_bytes)

    # 4. Comp 1 Index buffer (uint16 x 3)
    c1_idx_bytes = bytearray()
    for f in c1['faces']:
        c1_idx_bytes.extend(struct.pack('<HHH', f[0]-1, f[1]-1, f[2]-1))
    bv_c1_idx = add_to_buffer(c1_idx_bytes)

    # 5. Comp 2 Position buffer
    c2_pos_bytes = bytearray()
    c2_xs = [v[0] * scale for v in c2['verts']]
    c2_ys = [v[2] * scale for v in c2['verts']]
    c2_zs = [-v[1] * scale for v in c2['verts']]
    for x, y, z in zip(c2_xs, c2_ys, c2_zs):
        c2_pos_bytes.extend(struct.pack('<fff', x, y, z))
    bv_c2_pos = add_to_buffer(c2_pos_bytes)

    # 6. Comp 2 Normal buffer
    c2_n_bytes = bytearray()
    for n in c2['normals']:
        c2_n_bytes.extend(struct.pack('<fff', n[0], n[2], -n[1]))
    bv_c2_norm = add_to_buffer(c2_n_bytes)

    # 7. Comp 2 UV buffer
    c2_uv_bytes = bytearray()
    for uv in c2['uvs']:
        c2_uv_bytes.extend(struct.pack('<ff', uv[0], 1.0 - uv[1]))
    bv_c2_uv = add_to_buffer(c2_uv_bytes)

    # 8. Comp 2 Index buffer
    c2_idx_bytes = bytearray()
    for f in c2['faces']:
        c2_idx_bytes.extend(struct.pack('<HHH', f[0]-1, f[1]-1, f[2]-1))
    bv_c2_idx = add_to_buffer(c2_idx_bytes)

    # 9. Embedded Image Buffers (PNG files)
    with open('textures/leather_cognac_diffuse.png', 'rb') as f:
        diff_png = f.read()
    bv_diff_img = add_to_buffer(diff_png)

    with open('textures/leather_cognac_normal.png', 'rb') as f:
        norm_png = f.read()
    bv_norm_img = add_to_buffer(norm_png)

    with open('textures/leather_cognac_roughness.png', 'rb') as f:
        rough_png = f.read()
    bv_rough_img = add_to_buffer(rough_png)

    # Construct glTF JSON document
    gltf = {
        "asset": {
            "version": "2.0",
            "generator": "AURELIS Luxury 3D Model Pipeline"
        },
        "scenes": [{ "nodes": [0] }],
        "scene": 0,
        "nodes": [
            {
                "name": "Aurelis_Hobo_Bag",
                "children": [1, 2]
            },
            {
                "name": "HoboBag_Body",
                "mesh": 0
            },
            {
                "name": "HoboBag_Hardware_Buckle",
                "mesh": 1
            }
        ],
        "meshes": [
            {
                "name": "Mesh_HoboBag_Body",
                "primitives": [{
                    "attributes": {
                        "POSITION": 0,
                        "NORMAL": 1,
                        "TEXCOORD_0": 2
                    },
                    "indices": 3,
                    "material": 0
                }]
            },
            {
                "name": "Mesh_HoboBag_Hardware_Buckle",
                "primitives": [{
                    "attributes": {
                        "POSITION": 4,
                        "NORMAL": 5,
                        "TEXCOORD_0": 6
                    },
                    "indices": 7,
                    "material": 1
                }]
            }
        ],
        "materials": [
            {
                "name": "Leather_Cognac_Pebbled",
                "pbrMetallicRoughness": {
                    "baseColorFactor": [1.0, 1.0, 1.0, 1.0],
                    "baseColorTexture": { "index": 0 },
                    "metallicRoughnessTexture": { "index": 2 },
                    "roughnessFactor": 0.68,
                    "metallicFactor": 0.0
                },
                "normalTexture": {
                    "index": 1,
                    "scale": 1.4
                },
                "doubleSided": True
            },
            {
                "name": "Hardware_Gold",
                "pbrMetallicRoughness": {
                    "baseColorFactor": [0.90, 0.77, 0.44, 1.0], # Luxury champagne gold
                    "roughnessFactor": 0.20,
                    "metallicFactor": 1.0
                },
                "doubleSided": True
            }
        ],
        "textures": [
            { "sampler": 0, "source": 0 }, # Diffuse
            { "sampler": 0, "source": 1 }, # Normal
            { "sampler": 0, "source": 2 }  # Roughness
        ],
        "images": [
            { "bufferView": 8, "mimeType": "image/png", "name": "leather_cognac_diffuse" },
            { "bufferView": 9, "mimeType": "image/png", "name": "leather_cognac_normal" },
            { "bufferView": 10, "mimeType": "image/png", "name": "leather_cognac_roughness" }
        ],
        "samplers": [{
            "magFilter": 9729, # LINEAR
            "minFilter": 9987, # LINEAR_MIPMAP_LINEAR
            "wrapS": 10497,    # REPEAT
            "wrapT": 10497     # REPEAT
        }],
        "accessors": [
            # 0: c1 pos
            {
                "bufferView": 0,
                "byteOffset": 0,
                "componentType": 5126, # FLOAT
                "count": len(c1['verts']),
                "type": "VEC3",
                "min": [min(c1_xs), min(c1_ys), min(c1_zs)],
                "max": [max(c1_xs), max(c1_ys), max(c1_zs)]
            },
            # 1: c1 norm
            {
                "bufferView": 1,
                "byteOffset": 0,
                "componentType": 5126,
                "count": len(c1['normals']),
                "type": "VEC3"
            },
            # 2: c1 uv
            {
                "bufferView": 2,
                "byteOffset": 0,
                "componentType": 5126,
                "count": len(c1['uvs']),
                "type": "VEC2"
            },
            # 3: c1 indices
            {
                "bufferView": 3,
                "byteOffset": 0,
                "componentType": 5123, # UNSIGNED_SHORT
                "count": len(c1['faces']) * 3,
                "type": "SCALAR"
            },
            # 4: c2 pos
            {
                "bufferView": 4,
                "byteOffset": 0,
                "componentType": 5126,
                "count": len(c2['verts']),
                "type": "VEC3",
                "min": [min(c2_xs), min(c2_ys), min(c2_zs)],
                "max": [max(c2_xs), max(c2_ys), max(c2_zs)]
            },
            # 5: c2 norm
            {
                "bufferView": 5,
                "byteOffset": 0,
                "componentType": 5126,
                "count": len(c2['normals']),
                "type": "VEC3"
            },
            # 6: c2 uv
            {
                "bufferView": 6,
                "byteOffset": 0,
                "componentType": 5126,
                "count": len(c2['uvs']),
                "type": "VEC2"
            },
            # 7: c2 indices
            {
                "bufferView": 7,
                "byteOffset": 0,
                "componentType": 5123,
                "count": len(c2['faces']) * 3,
                "type": "SCALAR"
            }
        ],
        "bufferViews": [
            # 0: c1 pos
            { "buffer": 0, "byteOffset": bv_c1_pos[0], "byteLength": bv_c1_pos[1], "target": 34962 },
            # 1: c1 norm
            { "buffer": 0, "byteOffset": bv_c1_norm[0], "byteLength": bv_c1_norm[1], "target": 34962 },
            # 2: c1 uv
            { "buffer": 0, "byteOffset": bv_c1_uv[0], "byteLength": bv_c1_uv[1], "target": 34962 },
            # 3: c1 indices
            { "buffer": 0, "byteOffset": bv_c1_idx[0], "byteLength": bv_c1_idx[1], "target": 34963 },
            # 4: c2 pos
            { "buffer": 0, "byteOffset": bv_c2_pos[0], "byteLength": bv_c2_pos[1], "target": 34962 },
            # 5: c2 norm
            { "buffer": 0, "byteOffset": bv_c2_norm[0], "byteLength": bv_c2_norm[1], "target": 34962 },
            # 6: c2 uv
            { "buffer": 0, "byteOffset": bv_c2_uv[0], "byteLength": bv_c2_uv[1], "target": 34962 },
            # 7: c2 indices
            { "buffer": 0, "byteOffset": bv_c2_idx[0], "byteLength": bv_c2_idx[1], "target": 34963 },
            # 8: diff img
            { "buffer": 0, "byteOffset": bv_diff_img[0], "byteLength": bv_diff_img[1] },
            # 9: norm img
            { "buffer": 0, "byteOffset": bv_norm_img[0], "byteLength": bv_norm_img[1] },
            # 10: rough img
            { "buffer": 0, "byteOffset": bv_rough_img[0], "byteLength": bv_rough_img[1] }
        ],
        "buffers": [{
            "byteLength": len(bin_buffer)
        }]
    }

    json_str = json.dumps(gltf, separators=(',', ':'))
    json_bytes = json_str.encode('utf-8')
    # Pad JSON chunk to 4-byte boundary with space (0x20)
    while len(json_bytes) % 4 != 0:
        json_bytes += b' '

    json_chunk_header = struct.pack('<II', len(json_bytes), 0x4E4F534A) # 0x4E4F534A = JSON
    bin_chunk_header = struct.pack('<II', len(bin_buffer), 0x004E4942)  # 0x004E4942 = BIN

    total_glb_len = 12 + len(json_chunk_header) + len(json_bytes) + len(bin_chunk_header) + len(bin_buffer)
    glb_header = struct.pack('<III', 0x46546C67, 2, total_glb_len) # 0x46546C67 = glTF

    os.makedirs(os.path.dirname(glb_path), exist_ok=True)
    with open(glb_path, 'wb') as f:
        f.write(glb_header)
        f.write(json_chunk_header)
        f.write(json_bytes)
        f.write(bin_chunk_header)
        f.write(bin_buffer)

    print(f"Exported GLB: {glb_path} ({os.path.getsize(glb_path)} bytes)")

if __name__ == '__main__':
    print("Computing enhanced geometry normals and UVs...")
    mesh_data = compute_normals_and_uvs()

    # 1. Export improved OBJ and MTL to root and public directories
    os.makedirs("public/models", exist_ok=True)
    export_obj_and_mtl(mesh_data, "public/models/aurelis_hobo_bag.obj", "public/models/aurelis_hobo_bag.mtl")
    export_obj_and_mtl(mesh_data, "aurelis_hobo_bag.obj", "aurelis_hobo_bag.mtl")

    # 2. Export self-contained binary GLB with embedded PBR textures
    export_glb(mesh_data, "public/models/aurelis_hobo_bag.glb")
    export_glb(mesh_data, "aurelis_hobo_bag.glb")

    print("\nAll deliverables generated successfully!")
