import React, { useState } from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import './app-styles.scss';
const logo = require('./../assets/images/logo.png');
const externalLink = require('./../assets/images/icon-external-link.svg');
const tr = require('./translate.json');



type TData = {
    gender: string,
    age: number,
    weight: number,
    height: number,
    physicalActivity: string;

};

type TResult = {
    BMR: number,
    BMI: number,
    MHR: number,
    DWI: number,
    TDEE: number,
};

enum Language {
    PT_BR = 'pt-BR',
    EN_US = 'en-US'
}



const App: React.FC = () => {

    const { register, handleSubmit, reset } = useForm<TData>();
    const [result, setResult] = useState<TResult | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState<Language>(Language.PT_BR);

    const onSubmit: SubmitHandler<TData> = ({ age, gender, height, physicalActivity, weight }: TData) => {

        /* PAF/FAF  - Physical Activity Factor/Fator de atividade Física */
        let PAF = 0

        switch (physicalActivity) {
            case 'Sedentary':
                PAF = 1.2;
                break;
            case 'little_active':
                PAF = 1.375;
                break;
            case 'moderately_active':
                PAF = 1.55;
                break;
            case 'very_active':
                PAF = 1.725;
                break;
            case 'extremely_active':
                PAF = 1.9;
                break;
        };

        /* BMR/TMB  - Basal Metabolic Rate/Taxa Metabólica Basal */
        const BMR = gender !== 'male' ?
            Number((447.60 + (9.20 * weight) + (3.10 * height) - (4.3 * age)).toFixed(2)) :
            Number((88.36 + (13.40 * weight) + (4.80 * height) - (5.7 * age)).toFixed(2));

        /* TDEE/CDN  - Total Daily Energy Expenditure/Calorias Diárias Necessárias */
        const TDEE = Number((BMR * PAF).toFixed(2));

        /* MHR/FCM  - Maximum Heart Rate/Frequência Cardíaca Máxima */
        const MHR = gender !== 'male' ? 220 - age : 226 - age;

        /* BMI/IMC  - Body Mass Index/Índice de Massa Corporal */
        const BMI = Number((weight / Math.pow(height / 100, 2)).toFixed(2))

        /* DWI/IDA  - daily water intake/Ingestão Diária de Água */
        const DWI = Number((weight * 0.03).toFixed(2))

        setResult({ BMR, TDEE, MHR, BMI, DWI });

        setShowResult(true);
        reset();
    };


    return (
        <div className="app">
            {selectedLanguage === Language.PT_BR ?
                (<main className="pt-br">
                    <header className="header">
                        <img src={logo} alt="logo" />
                    </header>
                    <button type="button" onClick={() => setSelectedLanguage(Language.EN_US)} className="btn-language" id='btnLanguage'>
                        <span className="btn-language__span">english</span>
                        <img className="btn-language__img" src={externalLink} alt="external link icon" />
                    </button>
                    {showResult === false ? (<form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <fieldset>
                            <div className="form__group">
                                <label className="form__lbl" htmlFor="gender">Gênero</label>
                                <select defaultValue="" {...register('gender')} className="form__gender-select" name="gender" id="gender" required>
                                    <option className="form__gender-select__opt" value=""></option>
                                    <option className="form__gender-select__opt" value="male">Masculino</option>
                                    <option className="form__gender-select__opt" value="female">Feminino</option>
                                </select>
                            </div>
                            <div className="form__group">
                                <label className="form__lbl" htmlFor="age">Idade</label>
                                <input type="number" title="em anos - ex: 18" {...register('age')} step={0.01} placeholder="0" name="age" id="age" required />
                            </div>
                            <div className="form__group">
                                <label className="form__lbl" htmlFor="weight">Peso</label>
                                <input type="number" title="Valor em kg (quilo) "  {...register('weight')} step={0.01} placeholder="0" name="weight" id="weight" required />
                            </div>
                            <div className="form__group">
                                <label className="form__lbl" htmlFor="height">Altura</label>
                                <input type="number" title="valor em cm (centímetro) - 1.80m = 180cm" {...register('height')} step={0.01} placeholder="0" name="height" id="height" required />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div>
                                <label htmlFor="physicalActivity">Fator de atividade física</label>
                                <select defaultValue="Sedentary" {...register('physicalActivity')} className="form__physical-activity-select" name="physicalActivity" id="physicalActivity">
                                    <option className="form__physical-activity-select__opt" value="Sedentary">Sedentário</option>
                                    <option className="form__physical-activity-select__opt" value="little_active">Pouco ativo</option>
                                    <option className="form__physical-activity-select__opt" value="moderately_active">Moderadamente ativo</option>
                                    <option className="form__physical-activity-select__opt" value="very_active">Muito ativo</option>
                                    <option className="form__physical-activity-select__opt" value="extremely_active">Extremamente ativo</option>
                                </select>
                            </div>
                        </fieldset>
                        <button type="submit" className="form__submit">Calcular</button>
                    </form>) :
                        (result && showResult === true) &&


                        <section className="result">
                            <article className="data">
                                {Object.entries(result).map(obj =>
                                    <p className="item">{tr[obj[0]][0]} {':'} {obj[1]}
                                        <small className="description"> ({tr[obj[0]][2]})</small> </p>)}
                            </article>
                            <footer className="footer">
                                <a className="link"
                                    href="https://linktr.ee/ulissessilverio" target="_blank">
                                    linktree
                                </a>
                                <button className="btn-backToHome" onClick={(e) => {
                                    e.preventDefault();
                                    setShowResult(false)
                                }}>Voltar</button>
                            </footer>
                        </section>}
                    {
                    }
                </main>) :
                (<main className="en-us">
                    <header className="header">
                        <img src={logo} alt="logo" />
                    </header>
                    <button type="button" onClick={() => setSelectedLanguage(Language.PT_BR)} className="btn-language" id='btnLanguage'>
                        <span className="btn-language__span">Português</span>
                        <img className="btn-language__img" src={externalLink} alt="external link icon" />
                    </button>
                    {showResult === false ? (<form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <fieldset>
                            <div className="form__group">
                                <label className="form__lbl" htmlFor="gender">Gender</label>
                                <select defaultValue="" {...register('gender')} className="form__gender-select" name="gender" id="gender" required>
                                    <option className="form__gender-select__opt" value=""></option>
                                    <option className="form__gender-select__opt" value="male">Male</option>
                                    <option className="form__gender-select__opt" value="female">Female</option>
                                </select>
                            </div>
                            <div className="form__group">
                                <label className="form__lbl" htmlFor="age">Age</label>
                                <input type="number" title="in years - ex: 18" {...register('age')} step={0.01} placeholder="0" name="age" id="age" required />
                            </div>
                            <div className="form__group">
                                <label className="form__lbl form__lbl-weight" htmlFor="weight" style={{ marginRight: '3PX' }}>Weight</label>
                                <input type="number" title="in kg (kilogram) "  {...register('weight')} step={0.01} placeholder="0" name="weight" id="weight" required />
                            </div>
                            <div className="form__group">
                                <label className="form__lbl form__lbl-height" htmlFor="height">Height</label>
                                <input type="number" title="in cm (centimeter) - 1.80m = 180cm" {...register('height')} style={{ width: '29px' }} step={0.01} placeholder="0" name="height" id="height" required />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div>
                                <label htmlFor="physicalActivity">Physical Activity Factor</label>
                                <select defaultValue="Sedentary" {...register('physicalActivity')} className="form__physical-activity-select" name="physicalActivity" id="physicalActivity">
                                    <option className="form__physical-activity-select__opt" value="Sedentary">Sedentary</option>
                                    <option className="form__physical-activity-select__opt" value="little_active">Little active</option>
                                    <option className="form__physical-activity-select__opt" value="moderately_active">Moderately active</option>
                                    <option className="form__physical-activity-select__opt" value="very_active">Very active</option>
                                    <option className="form__physical-activity-select__opt" value="extremely_active">Extremely active</option>
                                </select>
                            </div>
                        </fieldset>
                        <button type="submit" className="form__submit">calculate</button>
                    </form>) :
                        (result && showResult === true) &&
                        <section className="result">
                            <article className="data">
                                {Object.entries(result).map(obj =>
                                    <p className="item">{tr[obj[0]][1]} {':'} {obj[1]}
                                        <small className="description"> ({tr[obj[0]][3]})</small> </p>)}
                            </article>
                            <footer className="footer">
                                <a className="link"
                                    href="https://linktr.ee/ulissessilverio" target="_blank">
                                    linktree
                                </a>
                                <button className="btn-backToHome" onClick={(e) => {
                                    e.preventDefault();
                                    setShowResult(false)
                                }}>back</button>
                            </footer>
                        </section>}
                    {
                    }
                </main>
                )}
        </div>
    )
};

export default App;