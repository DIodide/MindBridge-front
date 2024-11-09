"use client";
import VisGraph from "@/components/visGraph";


const Main = () => {
  function abc(nodeId) {
    console.log(nodeId);
  }
  return <VisGraph onClickFunction={abc} />;
};


export default Main;
