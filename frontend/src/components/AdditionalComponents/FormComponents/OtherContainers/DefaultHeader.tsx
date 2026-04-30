import "/src/components/AdditionalComponents/FormComponents/OtherContainers/DefaultHeader.css";
import {ArrowLeft} from "lucide-react";
import {useNavigate} from "react-router-dom";

interface DefaultHeaderProps{
    children: React.ReactNode
}

export default function DefaultHeader({children}:DefaultHeaderProps){
    const navigate = useNavigate();

    const back = () =>{
        navigate(-1);
    }

    return(
      <div className={"defaultHeaderContainer"}>
          <div className={"defaultHeaderBackButton"}>
              <ArrowLeft onClick={back} className={"cursor-pointer"}/>
          </div>
          {children}
      </div>
    );
}