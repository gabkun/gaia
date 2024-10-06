import React, { Component } from "react";
import axios from "axios";

class Rightbar extends Component {
  state = {
    totalClients: 0
  };

  componentDidMount() {
    axios.get('http://localhost:3001/users/getclientsnumber')
      .then(response => {
        this.setState({ totalClients: response.data.total_clients });
      })
      .catch(error => {
        console.error("There was an error fetching the total number of clients!", error);
      });
  }

  render() {
    const { totalClients } = this.state;

    return (
      <>
     <div className="flex h-screen flex-col lg:flex-row w-full h-screen relative">
     <div className="bg-gray-300 p-4 w-full ml-[20%] flex flex-col justify-around gap-2 p-2 lg:p-0">
          <div className="w-full h-20 text-2xl font-semibold text-black bg-gray-200 flex items-center">
            DASHBOARD
          </div>

          <div className="w-full h-96 bg-gray-200 flex items-center justify-around">
            <div className="w-80 h-64 bg-gray-400 p-4">
              <h2 className="text-lg font-bold">Number of Users</h2>
              <p className="text-9xl text-center m-4 font-bold"> {totalClients}</p>
            </div>
            <div className="w-80 h-64 bg-gray-400 p-4">
              <h2 className="text-lg font-bold">Number of Products</h2>
              {/* Render the number of products here */}
            </div>
          </div>
        </div>
        </div>
      </>
    );
  }
}

export default Rightbar;