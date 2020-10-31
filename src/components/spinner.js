import React from 'react';
import {FaSpinner} from 'react-icons/fa';

const Spinner = (props) =>{
    if(props.showBlock){
        return (
            <main className="page bg-white">
                <div className="row">
                    <div className="col-md-12 bg-white text-center" style={{fontSize: '70px'}}>
                        <FaSpinner className="icon-spin"/>
                    </div>
                </div>
            </main>
        );
    }else{
        return (
            <FaSpinner className="icon-spin"/>
        );
    }
}

export default Spinner;