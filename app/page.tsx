import Header from "@/components/Header";
import HeroCanvas from "@/components/HeroCanvas";
import AmbienceSection from "@/components/sections/AmbienceSection";
import CurtainControl from "@/components/sections/CurtainControl";
import LightingControl from "@/components/sections/LightingControl";
import SmartConsole from "@/components/sections/SmartConsole";
import SmartApp from "@/components/sections/SmartApp";
import Intelligence from "@/components/sections/Intelligence";
import ContactForm from "@/components/sections/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <HeroCanvas />
      <AmbienceSection />
      <CurtainControl />
      <LightingControl />
      <SmartConsole />
      <SmartApp />
      <Intelligence />
      <ContactForm />
      <Footer />
    </>
  );
}