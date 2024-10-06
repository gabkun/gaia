import React from "react";
import Sidebar from "../dashboard/sidebar";
import Rightbar from "../dashboard/rightbar";


class Dashboard extends React.Component{
    render(){
    return (
    
        <>
        <dash class="w-full bg-gray-600 flex flex-row">

            <Sidebar />
            <Rightbar />

        </dash>
        

      
        </>
    );
  }
}
  
  export default Dashboard;