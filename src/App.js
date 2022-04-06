import { useEffect, useState } from 'react';
import  LineChartCustom  from './components/LineChartCustom';
import BarChartCustom from './components/BarChartCustom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAsPng } from 'save-html-as-image';

function App() {
  const [ciudades] = useState([])
  const [indicador2, setIndicador2] = useState([])
  const [change, setChange] = useState(true)
  const [visible, setVisible] = useState(false)

  const filtro = () =>{   //Crea el filtro de ciudades
    for (let i in indicador2) {
      ciudades[i] = indicador2[i].ciudad
    }
    if(visible){
      setVisible(false)
      for( let i in ciudades){
        ciudades[i] = null
      }
    }else{
      setVisible(true)
    }
  }
  function checkboxChange (e, data) { //Obtiene los datos de las ciudades seleccionadas
    if(!e.target.checked){
      for (let i in indicador2){
        if (indicador2[i].ciudad === data){
         if (i == 0) { 
           indicador2.shift()
          return 
          }
         if ( i == indicador2.length ){
          indicador2.pop() 
          return 
         }
         indicador2.splice(i,1)
        return 
        }
      }
    }
  }
  const downloadPdf = () => { //Crea el pdf con el gráfico
    html2canvas(document.getElementById('pdf')).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 35, 40, 220, 120);
      pdf.save('Grafico.pdf');
    });
  }
  const downloadPng = () => {
    const nodo = document.getElementById('pdf')
    saveAsPng(nodo)
  }

  const cambiar = () => { //Cambia el tipo de gráfico
    if(change){
      setChange(false)
    } else { 
      setChange(true)
    }
  }
  const getMetas = async () => { //Obtiene los datos del indicador
    try{
      const response = await fetch('http://localhost:5000/')
      const data = await response.json()
      setIndicador2(data)
    }catch(error){
      return error
    }
  }
  useEffect(()=>{
    getMetas();
  }, [])  
  return (
    <div className= 'flex-colmin-h-screen justify-center align-middle'>
      <p className = 'text-6xl text-slate-700 font-bold text-center m-4 p-4'>Prueba Day Store</p>
      <section className = 'flex justify-around'>
        <button className = 'bg-slate-700 text-white font-light hover:bg-slate-400 rounded-full p-3 m-3' onClick={(e)=>{e.preventDefault(); cambiar()}}>Cambiar tipo de gráfico</button>
        <button className = 'bg-slate-700 text-white font-light hover:bg-slate-400 rounded-full p-3 m-3' onClick={(e)=>{e.preventDefault(); downloadPdf()}}>Descargar PDF</button> 
        <button className = 'bg-slate-700 text-white font-light hover:bg-slate-400 rounded-full p-3 m-3' onClick={(e)=>{e.preventDefault(); downloadPng()}}>Descargar PNG</button> 
        <button className = 'bg-slate-700 text-white font-light hover:bg-slate-400 rounded-full p-3 m-3' onClick = { ()=>{filtro(); getMetas()}}>Crear Filtro</button>
      </section>
      <div className = 'flex h-fit items-center justify-center'>
        <div id = 'pdf' className='bg-white container p-4 rounded-md drop-shadow-xl'>
          {change ? <BarChartCustom data = {indicador2}/> : <LineChartCustom data = {indicador2}/>}
        </div>
      </div>
      {visible ? 
      <div className='flex justify-center mt-3'>
          <ul>
            {ciudades.map((indicador) => (
             <li key = {indicador}>
               <input className ="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-full bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"  type="checkbox" value={indicador} defaultChecked onChange={(e)=>checkboxChange(e,indicador)}/>
               <label className = 'text-md' laberfor= {indicador}>{indicador}</label> 
             </li>
            ))}
          </ul> 
          <div className= 'grid content-center '>
            <button className = 'bg-gray-200 text-gray-800 font-light hover:bg-gray-300 p-1 m-1' onClick = {()=>{ cambiar(); setTimeout(()=>{ setChange(true)},50);  setVisible(false)} }>Aceptar</button>
            <button className = 'bg-gray-200 text-gray-800 font-light hover:bg-gray-300 p-1 m-1' onClick = {()=>{getMetas(); setVisible(false)}}>Cancelar</button>
          </div>
      </div>
           : <></>}
           
    </div>
  );
}

export default App;
