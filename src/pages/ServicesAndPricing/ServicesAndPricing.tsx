
import ServiceTypesPage from "./ServiceTypesPage";
import ServicesHeader from "../../components/ServicesAndPricing/ServicesHeader";
import Premium from "../../components/ServicesAndPricing/Premium";


const ServicesAndPricing = () => {

  return (
    <div className="p-6">

            <ServicesHeader />
      <div className="pt-6">
      <ServiceTypesPage />
      </div>
      <div className="pt-6">
      </div>


      <div className="pt-6">

        <Premium />
      </div>




    </div>
  )
}

export default ServicesAndPricing