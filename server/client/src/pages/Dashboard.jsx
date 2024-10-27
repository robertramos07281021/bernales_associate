import { useEffect } from "react"
import { useLastAnnouncementQuery } from "../redux/api/announcement"


const Dashboard = () => {
  const {data, refetch} = useLastAnnouncementQuery()

  const announcement = JSON.parse(localStorage.getItem('announcement'))


 
  useEffect(()=> {
    const timer = setTimeout(()=> {
      refetch()
      if(announcement){
        if(data?._id != announcement?._id){
          document.getElementById('audio').play()
          localStorage.setItem("announcement", JSON.stringify(data))
        }
      } else {
        localStorage.setItem("announcement", JSON.stringify(data))
      }
    },3000)
    return ()=> clearTimeout(timer)
  })

  return (
    <div className="w-full min-h-screen bg-fixed bg-cover flex items-center justify-center px-24" style={{backgroundImage: `url(/BA_BG.jpg)`}}> 
      <div className="text-black w-full text-center font-bold text-6xl">
        {data?.announcement}
        <audio controls id="audio" hidden>
          <source src="/mixkit-correct-answer-tone-2870.wav" type="audio/mpeg" />
        </audio>
      </div>
    </div>
  )
}

export default Dashboard
