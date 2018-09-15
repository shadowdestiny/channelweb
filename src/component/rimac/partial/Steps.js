import React, {Component} from 'react';
import Policy from "../../../functions/Policy";

class Steps extends Component {
    render() {
        let {stepNumber} = this.props;
        let {IsVisible}  = this.props;
        let step_1 = stepNumber === '1' || stepNumber === '2' || stepNumber === '3' || stepNumber === '4' || stepNumber === '5';
        let step_2 = stepNumber === '2' || stepNumber === '3' || stepNumber === '4' || stepNumber === '5';
        let step_3 = stepNumber === '3' || stepNumber === '4' || stepNumber === '5';
        let step_4 = stepNumber === '4' || stepNumber === '5';
        let step_5 = stepNumber === '5';
        let step_6 = IsVisible === '1';

        return (
            <div className="steps">
                <div className="steps-status">
                    <div className={step_1 ? 'col-sm-2 selected' : 'col-sm-2'}>
                        Seleccionar Póliza
                        <div className="radius">
                            <div>
                                <div></div>
                                &nbsp;
                            </div>
                        </div>
                    </div>
                    <div className={!step_6  ? "visible" : "no-visible"}>
                    <div className={step_2  ? 'col-sm-2 selected' : 'col-sm-2'}>
                        Datos de la inspección
                        <div className="radius">
                            <div>
                                <div></div>
                                &nbsp;
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className={step_3  ? 'col-sm-2 selected' : 'col-sm-2'}>
                        Datos del siniestro
                        <div className="radius">
                            <div>
                                <div></div>
                                &nbsp;
                            </div>
                        </div>
                    </div>
                    {!Policy.isAtenderSinPoliza() ?
                    <div className={step_4 ? 'col-sm-2 selected' : 'col-sm-2'}>
                        Seleccionar cobertura
                        <div className="radius">
                            <div>
                                <div></div>
                                &nbsp;
                            </div>
                        </div>
                    </div>: ""}

                    <div className={step_5  ? 'col-sm-2 selected' : 'col-sm-2'}>
                        Datos adicionales
                        <div className="radius">
                            <div className="steps-status width-defined">
                                <div ></div>
                                &nbsp;
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Steps;