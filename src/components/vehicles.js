import React from 'react'
import '../Vehicles.css'

const Vehicles = ({policies}) => {
    return (
        <div>
            {policies.map((policy, index) => {
                return (
                    <div key={index}>
                        <br/>
                        <center>
                            <ul><b>Policy ID:</b> {policy.id}</ul>
                        </center>
                        <center><h1>Vehicles</h1></center>
                        {
                            policy.vehicles.map((vehicle, index) => {
                                return (
                                    <div key={index}>
                                        <center>
                                            <table id="vehicletable">
                                                <tbody>
                                                <tr>
                                                    <th>Make</th>
                                                    <th>Model</th>
                                                    <th>Year</th>
                                                    <th>VIN</th>
                                                </tr>
                                                <tr>
                                                    <td>{vehicle.make}</td>
                                                    <td>{vehicle.model}</td>
                                                    <td>{vehicle.year}</td>
                                                    <td>{vehicle.vin}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </center>
                                        <br/>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            })}
        </div>
    )
};

export default Vehicles