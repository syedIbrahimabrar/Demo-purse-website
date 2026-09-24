import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroSection } from '../components/HeroSection';
import { TrustBenefitsStrip } from '../components/TrustBenefitsStrip';
import { MaterialsSection } from '../components/MaterialsSection';
import { CraftsmanshipSection } from '../components/CraftsmanshipSection';
import { CollectionPreview } from '../components/CollectionPreview';
import { ServiceAssuranceStrip } from '../components/ServiceAssuranceStrip';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#FAF8F5]">
      {/*
        3. HOMEPAGE — PRESERVE THE EXISTING HERO
        Preserves the exact background, typography, layout, existing text,
        and current 3D handbag container ('hero-bag-container').
      */}
      <HeroSection onExplore={() => navigate('/collections')} />

      {/*
        Space Below Hero:
        Small amount of clean, intentional vertical space (approximately 40–60px on desktop)
        before the benefits strip, preserving the 3D scroll staging transition.
      */}
      <div
        id="hero-transition-buffer"
        aria-hidden="true"
        className="h-10 sm:h-12 md:h-[50px] lg:h-[60px] w-full bg-[#FAF8F5] shrink-0"
      />

      {/* 4. Trust / Benefits Strip */}
      <TrustBenefitsStrip />

      {/* 5. Materials Section with dedicated 'materials-bag-container' */}
      <MaterialsSection />

      {/* 6. Craftsmanship Section */}
      <CraftsmanshipSection />

      {/* 7. Homepage Collection Preview — Exactly FOUR bags */}
      <CollectionPreview />

      {/* Service Assurance (Complimentary Shipping & Easy Return) */}
      <ServiceAssuranceStrip />
    </div>
  );
};

