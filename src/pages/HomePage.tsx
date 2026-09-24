import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroSection } from '../components/HeroSection';
import { TrustBenefitsStrip } from '../components/TrustBenefitsStrip';
import { MaterialsSection } from '../components/MaterialsSection';
import { CraftsmanshipSection } from '../components/CraftsmanshipSection';
import { CollectionPreview } from '../components/CollectionPreview';
import { ServiceAssuranceStrip } from '../components/ServiceAssuranceStrip';
import { SEO } from '../components/SEO';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#FAF8F5]">
      <SEO
        title="AURELIS — Luxury Handbag Maison | Timeless Designer Bags"
        description="Discover AURELIS luxury handcrafted leather handbags. Timeless architectural silhouettes, full-grain Italian leather, and master artisanal craftsmanship."
        image="/image.png"
      />

      <HeroSection onExplore={() => navigate('/collections')} />

      {/* Spacing below hero */}
      <div
        aria-hidden="true"
        className="h-8 sm:h-10 md:h-12 w-full bg-[#FAF8F5] shrink-0"
      />

      {/* Trust / Benefits Strip */}
      <TrustBenefitsStrip />

      {/* Materials Section */}
      <MaterialsSection />

      {/* Craftsmanship Section */}
      <CraftsmanshipSection />

      {/* Homepage Collection Preview */}
      <CollectionPreview />

      {/* Service Assurance */}
      <ServiceAssuranceStrip />
    </div>
  );
};
