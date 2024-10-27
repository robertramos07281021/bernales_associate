import { useState } from "react"
import { useCreateAnnouncementMutation } from "../../redux/api/announcement"


const HRDashboard = () => {
  const [announcement, setAnnouncement] = useState("") 
  const [required, setRequired] = useState(false)
  const [createAnnouncement] = useCreateAnnouncementMutation()

  const handleSubmit = async(e) => {
    e.preventDefault()
    if(!announcement) {
      setRequired(true)
    } else {
      try {
        setRequired(false)
        const res = await createAnnouncement({announcement}).unwrap()
        if(!res.error){
          setAnnouncement("")
        }
      } catch (error) {
        console.log(error)

      }

    }

  }


  return (
    <div className="w-full h-screen flex items-center justify-center bg-fixed bg-cover" style={{backgroundImage: `url(/BA_BG.jpg)`}}>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {
          required &&
        <p className="text-red-500 font-bold">Please add new announcement</p>
        }
        <textarea onChange={(e)=> setAnnouncement(e.target.value)} value={announcement} className="border-2 border-slate-300 w-96 h-60 rounded-md shadow-md shadow-black/40 resize-none p-2 "></textarea>
        <button className="border-2 border-blue-500 py-2 text-lg bg-blue-500 text-white font-bold rounded shadow-md shadow-black/60">Submit</button>
        
      </form>
    </div>
  )
}

export default HRDashboard
