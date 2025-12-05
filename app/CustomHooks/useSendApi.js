import { useNavigate } from "react-router-dom";
import axios from "axios";

const useSendApi = () => {
  const { AppObject } = useContext(ObjectContext);
  const navigate = useNavigate();

  const SendApi = async (
    Url,
    SuccessCallback,
    ProblemCallback = () => {
      AppObject.notify(false, "! مشکلی پیش آمد");
    },
    FailorCallback = (error) => {
      navigate("/Error");
      AppObject.notify(false, "! مشکلی در برقراری ارتباط با سرور پیش آمد");
    }
  ) => {
    try {
      const response = await axios.get(
        "https://carpet-back-end.vercel.app" + Url,
        Data
      );
      if (response.data.msg == 0) {
        console.log(Data?.class_name+' '+Data?.function_name,response);
        SuccessCallback(response.data);
      } else {
        console.error(Data?.class_name+' '+Data?.function_name,response)
        ProblemCallback(response.data)
      }
    } catch (error) {
      console.error(Data?.class_name+' '+Data?.function_name,error);
      FailorCallback(error);
    }
  };

  return SendApi;
};

export default useSendApi;
