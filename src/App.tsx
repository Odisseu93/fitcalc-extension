import React from "react";
import './app-styles.scss'
const logo = require('./../assets/images/logo.png');
const externalLink = require('./../assets/images/icon-external-link.svg');

const App: React.FC = () => {
    return (
        <div className="app">
            <header className="header"><img src={logo} alt="logo" /></header>
            <button type="button" className="btn-language" id='btnLanguage'>
                <span className="btn-language__span">English Version</span>
                <img className="btn-language__img" src={externalLink} alt="external link icon" />
            </button>
            <form className="form" action="">
                <fieldset>
                    <div className="form__group">
                        <label className="form__lbl" htmlFor="gender">Gênero</label>
                        <select className="form__gender-select" name="gender" id="gender">
                            <option className="form__gender-select__opt" value=""></option>
                            <option className="form__gender-select__opt" value="male">Masculino</option>
                            <option className="form__gender-select__opt" value="female">Feminino</option>
                        </select>
                    </div>
                    <div className="form__group">
                        <label className="form__lbl" htmlFor="age">Idade</label>
                        <input type="number" step={0.01} name="age" id="age" />
                    </div>
                    <div className="form__group">
                        <label className="form__lbl" htmlFor="weight">Peso</label>
                        <input type="number" step={0.01} name="weight" id="weight" />
                    </div>
                    <div className="form__group">
                        <label className="form__lbl" htmlFor="height">Altura</label>
                        <input type="number" step={0.01} name="height" id="height" />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="group__group">
                        <label htmlFor="physicalActivity">Fator de atividade física</label>
                        <select className="form__physical-activity-select" name="physicalActivity" id="physicalActivity">
                            <option className="form__physical-activity-select__opt" value="Sedentary">Sedentário</option>
                            <option className="form__physical-activity-select__opt" value="little_active">Pouco ativo</option>
                            <option className="form__physical-activity-select__opt" value="moderately_active">Moderadamente ativo</option>
                            <option className="form__physical-activity-select__opt" value="very_active">Muito ativo</option>
                            <option className="form__physical-activity-select__opt" value="extremely_active">Extremamente ativo</option>
                        </select>
                    </div>
                </fieldset>
                <button className="form__submit">Calcular</button>
            </form>
        </div>
    )
};

export default App;