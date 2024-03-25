import BarCharts from "@/components/charts/BarCharts";
import Piecharts from "@/components/charts/PieCharts";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="flex flex-col  flex-shrink items-start justify-between  w-full h-full p-10 gap-10 ml-5">
      <div className=" bg-white shadow-xl rounded-1xl flex items-center flex-shrink justify-evenly w-full h-32 p-3">
        <div className=" h-full flex items-center justify-center w-[280px] rounded-xl">
          <h1>asdasadas</h1>
        </div>
        <div className=" h-full flex items-center justify-center w-[280px] rounded-xl">
          <h1>asdasadas</h1>
        </div>
        <div className=" h-full flex items-center justify-center w-[280px] rounded-xl">
          <h1>asdasadas</h1>
        </div>
        <div className=" h-full flex items-center justify-center w-[280px] rounded-xl">
          <h1>asdasadas</h1>
        </div>
      </div>
      <div className=" bg-white p-5  shadow-xl flex rounded-3xl w-full h-[400px] ">
        <div className="">
          <BarCharts />
        </div>

        <div className="flex flex-col w-full h-full items-center justify-center ">
          <Piecharts />
        </div>
      </div>
      <div className="bg-white shadow-xl rounded-3xl  w-full h-[400px] ">
        <h1>asd</h1>
      </div>
    </div>
  );
};

export default Home;
