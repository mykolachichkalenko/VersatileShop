import CreateProductAITitle
    from "@/components/PageComponents/AIPageComponents/CreateProductAIComponents/CreateProductAIContent/CreateProductAITitle.tsx";
import CreateProductAIRules
    from "@/components/PageComponents/AIPageComponents/CreateProductAIComponents/CreateProductAIContent/CreateProductAIDescribe.tsx";

export default function CreateProductAIContainer(){

    return(
      <div>
          <CreateProductAITitle/>
          <CreateProductAIRules/>
      </div>
    );
}