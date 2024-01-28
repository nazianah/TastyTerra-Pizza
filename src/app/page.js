
import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";


export default function Home() {
  return (
    <>
    
    <Hero />
    <HomeMenu />
    <section className="text-center my-16">
      <SectionHeaders
      subHeader={'Our Story'}
      mainHeader={'About Us'} 
      />
      <div className="text-gray-500 max-w-2xl mx-auto mt-4 flex flex-col gap-4">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Quisquam, voluptatum!

      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Quisquam, voluptatum!

      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.  
      </p>

      </div>
     
    </section>
    <section className="text-center my-8">
      <SectionHeaders subHeader={'Do not hesitate'}
      mainHeader={'Contact Us'} 
      />
      <div className="mt-8">
      <a className="text-4xl underline text-gray-500" href="tel:+23058283433">+230 58283433</a>

      </div>
     
    </section>
    
    </>
  )
}
