import React, { useState } from 'react'
// import qr from '../assets/qrcode.png'

const QrCode = () => {
  const [qrInput,setQrInput] = useState('')
  const [qrSize,setQrSize] = useState('')
  const [qrImg,setQrImg] = useState('')
  const [loading,setLoading] = useState(false)



  async function getQrData(){
    setLoading(true)
    try {
       const url =`https://api.qrserver.com/v1/create-qr-code/?size= ${qrSize}*${qrSize}&data=${encodeURIComponent(qrInput)}`;
        setQrImg(url)
        console.log(url)
      } catch (error) {
      console.log(error)
    }
    finally{
      setLoading(false)
    }
    
  }
  function qrDownload(){
    fetch(qrImg).then(res=>res.blob())
    .then((blob)=>{
      const link = document.createElement('a');
      link.href= URL.createObjectURL(blob);
      link.download = 'QrCodeGen.png'
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setQrImg('')
      setQrInput('')
      setQrSize('')
    })
    .catch((err)=>{
      console.log(err);
    })
  }


  return (
    <>
      <div className='flex flex-col justify-center items-center w-full h-screen text-sm text-white '>
      <h1 className='text-lg mb-5'>Qr Code Generator</h1>
      {qrImg && <img src={qrImg} alt='qr'/>}
      {loading && <p>Loading...</p> }
    <div className='flex flex-col mt-5 '>
        <div className='mb-2'>
            <label htmlFor='QrInput'className='text-sm'>Enter the Link </label>
          <input
            type='text'
            className='w-full border border-gray-300 py-1 px-2 rounded'
            placeholder='enter the link'
            value={qrInput}
            id='QrInput'
            disabled={loading}
            onChange={(e)=>setQrInput(e.target.value)}
          />
        </div>

        <div className='mb-8'>
        <label htmlFor='sizeInput' >Enter the Size </label>
          <input
            type='text'
            className='w-full border border-gray-300 py-1 px-2 rounded '
            placeholder='enter size'
            value={qrSize}
            id='sizeInput'
            onChange={(e)=>setQrSize(e.target.value)}

          />
        </div>
         
          
          <div className='flex '>
              <button 
                className='bg-blue-600 rounded px-5 text-sm text-white py-1 mr-5'
                onClick={getQrData}
                >
                Get qr image
                </button>
              <button 
                className='bg-green-600 rounded px-5 text-sm text-white py-1'
                onClick={qrDownload}
                >
                Download Qr
                </button>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default QrCode