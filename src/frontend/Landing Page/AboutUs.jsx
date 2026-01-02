import { useState } from 'react'
import Navbar from './Navbar'
import CITLogo from '../../assets/images/citLogo.png'
import V9Gradient from '../../assets/images/V9.svg'
import AlwynImage from '../../assets/images/Nabor.png'
import IanImage from '../../assets/images/Anoñuevo.jpg'
import CaringalImage from '../../assets/images/Caringal.png'
import SuarillaImage from '../../assets/images/Suarilla.jpg'
import BobisImage from '../../assets/images/Bobis.jpg'
import CanasImage from '../../assets/images/Cañas.png'
import GamboaImage from '../../assets/images/Gamboa.png'
import MenorImage from '../../assets/images/Menor.png'
import AdoptanteImage from '../../assets/images/Adoptante.jpg'
import BelmonteImage from '../../assets/images/Belmonte.png'
import BenaventeImage from '../../assets/images/Benavente.png'
import NocheImage from '../../assets/images/noche.png'
import OribianaImage from '../../assets/images/Oribiana.png'
import RejotoImage from '../../assets/images/Rejoto.png'
import SabileImage from '../../assets/images/Sabile.jpg'
import SandagonImage from '../../assets/images/Sandagon.jpg'
import SanJoseImage from '../../assets/images/SanJose.jpg'
import VerzosaJMImage from '../../assets/images/VerzosaJM.png'
import AlvaradoImage from '../../assets/images/Alvarado.png'


const tabs = ["Frontend Developers", "Backend Developers", "UI/UX Designer", "Researcher", "Documenters"];

const teamMembers = {
  "Frontend Developers": [
    {
      name: "Mark Angelo Alvarado",
      role: "Frontend Developer",
      status: "Programmer, Tailwind, React JS",
      section: "4A",
      image: AlvaradoImage
    },
    {
      name: "Ian Jay Anoñuevo",
      role: "Frontend Developer",
      status: "Programmer, Tailwind, React JS",
      section: "4A",
      image: IanImage
    },
    {
      name: "Leomar Ceazar Caringal",
      role: "Frontend Developer",
      status: "Programmer",
      section: "4A",
      image: CaringalImage
    },
    {
      name: "Josephus Paulo Cordero",
      role: "Frontend Developer",
      status: "Programmer",
      section: "4A",
      image: null
    },
    {
      name: "Aleron Jay Llenas",
      role: "Frontend Developer",
      status: "Programmer",
      section: "4A",
      image: null
    },
    {
      name: "Alwyn Nabor",
      role: "Frontend Developer",
      status: "Team Leader",
      section: "4B",
      image: AlwynImage
    },
    {
      name: "Charline Suarilla",
      role: "Frontend Developer",
      status: "Programmer, Tailwind, React JS",
      section: "4B",
      image: SuarillaImage
    },
    {
      name: "Marc Jewel Verzosa",
      role: "Frontend Developer",
      status: "Programmer",
      section: "4B",
      image: null
    }
  ],
  "Backend Developers": [
    {
      name: "Emier Amado",
      role: "Backend Developer",
      status: "Member",
      section: "4A",
      image: null
    },
    {
      name: "Kristan James Aragon",
      role: "Backend Developer",
      status: "Member",
      section: "4A",
      image: null
    },
    {
      name: "Jaspher Jed Bobis",
      role: "Backend Developer",
      status: "Team Leader",
      section: "4A",
      image: BobisImage
    },
    {
      name: "Symon Jed Destura",
      role: "Backend Developer",
      status: "Member",
      section: "4A",
      image: null
    },
    {
      name: "Mikee Laurente",
      role: "Backend Developer",
      status: "Member",
      section: "4A",
      image: null
    },
    {
      name: "Cyrus Misolas",
      role: "Backend Developer",
      status: "Member",
      section: "4A",
      image: null
    }
  ],
  "UI/UX Designer": [
    {
      name: "Jake Bansig",
      role: "UI/UX Designer",
      status: "Member",
      section: "4A",
      image: null
    },
    {
      name: "Jose Bequio",
      role: "UI/UX Designer",
      status: "Member",
      section: "4A",
      image: null
    },
    {
      name: "Tristan Dela Cruz",
      role: "UI/UX Designer",
      status: "Member",
      section: "4B",
      image: null
    },
    {
      name: "Airon Paul Maala",
      role: "UI/UX Designer",
      status: "Member",
      section: "4A",
      image: null
    },
    {
      name: "Niko Palenquez",
      role: "UI/UX Designer",
      status: "Member",
      section: "4B",
      image: null
    },
    {
      name: "Gwyneth Louise Poblete",
      role: "UI/UX Designer",
      status: "Member",
      section: "4B",
      image: null
    },
    {
      name: "Jessa Mae Solano",
      role: "UI/UX Designer",
      status: "Member",
      section: "4B",
      image: null
    }
  ],
  "Researcher": [
    {
      name: "Ruth Nicole E. Adoptante",
      role: "Researcher",
      status: "S/Y 2016-2018",
      section: "4A",
      image: AdoptanteImage
    },
    {
      name: "Jean Belmonte",
      role: "Researcher",
      status: "S/Y 2022-2025",
      section: "4A",
      image: BelmonteImage
    },
    {
      name: "Dynica Benavente",
      role: "Researcher",
      status: "S/Y 2016-2018",
      section: "4A",
      image: BenaventeImage
    },
    {
      name: "Francis Noche",
      role: "Researcher",
      status: "S/Y 2019-2021",
      section: "4A",
      image: NocheImage
    },
    {
      name: "Rainer Joshua Oribiana",
      role: "Researcher",
      status: "S/Y 2016-2018",
      section: "4A",
      image: OribianaImage
    },
    {
      name: "Diana Mary Ann Rejoto",
      role: "Researcher",
      status: "S/Y 2022-2025",
      section: "4A",
      image: RejotoImage
    },
    {
      name: "Ma. Sarah Sabile",
      role: "Researcher",
      status: "Assistant Researcher",
      section: "4A",
      image: SabileImage
    },
    {
      name: "Dale Mar Sandagon",
      role: "Researcher",
      status: "Lead Researcher",
      section: "Faculty",
      image: SandagonImage
    },
    {
      name: "Maria Monica San Jose",
      role: "Researcher",
      status: "S/Y 2022-2025",
      section: "4A",
      image: SanJoseImage
    },
    {
      name: "Jay Mark Verzosa",
      role: "Researcher",
      status: "S/Y 2019-2021",
      section: "4A",
      image: VerzosaJMImage
    }
  ],
  "Documenters": [
    {
      name: "Ira Antonette Barbacena",
      role: "Documenter",
      status: "Member",
      section: "4A",
      image: null
    },
    {
      name: "Marlon Caisip",
      role: "Documenter",
      status: "Member",
      section: "4A",
      image: null
    },
    {
      name: "Mark Jason Cañas",
      role: "Documenter",
      status: "Member",
      section: "4A",
      image: CanasImage
    },
    {
      name: "Jerick Gamboa",
      role: "Documenter",
      status: "Team Leader",
      section: "4B",
      image: GamboaImage
    },
    {
      name: "John Eric Troy Jizmundo",
      role: "Documenter",
      status: "Member",
      section: "4A",
      image: null
    },
    {
      name: "John Joshua Llego",
      role: "Documenter",
      status: "Member",
      section: "4A",
      image: null
    },
    {
      name: "Ana Mae Menor",
      role: "Documenter",
      status: "Member",
      section: "4A",
      image: MenorImage
    },
    {
      name: "Angela Olpato",
      role: "Documenter",
      status: "Member",
      section: "4A",
      image: null
    },
    {
      name: "Michelle Sayat",
      role: "Documenter",
      status: "Member",
      section: "4A",
      image: null
    },
    {
      name: "Ralph Louie Villanueva",
      role: "Documenter",
      status: "Member",
      section: "4A",
      image: null
    }
  ]
};

const roleDescriptions = {
  "Frontend Developers": "Responsible for designing and developing the user interface, ensuring a smooth and visually appealing experience for all users.",
  "Backend Developers": "Responsible for developing server-side logic, database management, and API integration.",
  "UI/UX Designer": "Responsible for creating intuitive and visually appealing user interfaces and experiences.",
  "Researcher": "Responsible for conducting research, gathering requirements, and analyzing user needs.",
  "Documenters": "Responsible for creating and maintaining project documentation."
};

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState("Frontend Developers");

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      {/* About Us Section */}
      <section className="relative pt-24 pb-20 overflow-hidden md:pt-32">
        {/* V9.svg gradient background - same as Home page */}
        <div className="absolute inset-0 bg-white" aria-hidden />
        <div 
          className="absolute inset-0 opacity-100" 
          style={{ 
            backgroundImage: `url(${V9Gradient})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }} 
          aria-hidden 
        />
        <div className="relative flex flex-col items-center px-6 text-center">
          {/* Large Circular Icon */}
          <div className="mb-12">
            <div className="relative flex items-center justify-center w-64 h-64 rounded-full shadow-2xl md:w-80 md:h-80 bg-linear-to-br from-purple-100 to-purple-200">
              <img 
                src={CITLogo} 
                alt="CIT Logo" 
                className="object-contain h-36 w-36 md:w-72 md:h-72"
              />
            </div>
          </div>

          {/* About Us Title */}
          <h1 className="mb-10 text-5xl font-extrabold leading-snug md:text-6xl md:leading-tight">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-purple-600 to-purple-800">About Us</span>
          </h1>

          {/* Description */}
          <div className="max-w-4xl mx-auto mb-8">
            <p className="text-lg leading-relaxed text-center text-gray-600 md:text-xl">
              This system was created by Batch 2025, sections 4A and 4B, in compliance with their IT Elective subject. It serves as a centralized platform where students can easily access, upload, and explore capstone projects from the College of Information Technology. The purpose of this system is to promote academic collaboration, preserve student research, and provide a convenient digital space for knowledge sharing. It aims to make the research process more efficient and accessible for both students and faculty members, encouraging continuous learning and innovation within the college.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-16 bg-white">
        <div className="px-6 mx-auto max-w-7xl">
          {/* Title */}
          <h2 className="mb-4 text-4xl font-extrabold leading-snug text-center md:text-5xl md:leading-tight">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-purple-600 to-purple-800">Meet the Team</span>
          </h2>
          
          {/* Subtitle */}
          <p className="mb-12 text-lg text-center text-gray-600">
            Get to know the masterminds behind this innovative system.
          </p>

          {/* Team Roles Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 md:gap-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative text-base md:text-lg font-semibold transition-colors pb-2 px-2 ${
                  activeTab === tab
                    ? "text-purple-700 underline decoration-purple-700 decoration-2 underline-offset-4"
                    : "text-gray-600 hover:text-purple-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Role Description */}
          <p className="max-w-3xl mx-auto mb-12 text-center text-gray-700">
            {roleDescriptions[activeTab]}
          </p>

          {/* Team Member Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {teamMembers[activeTab]?.map((member, index) => (
              <div
                key={index}
                className="flex flex-col p-3 transition-all duration-300 shadow-md bg-purple-50 rounded-xl hover:shadow-lg hover:scale-105"
              >
                {/* Profile Picture */}
                <div className="relative flex items-center justify-center w-full mb-3" style={{ height: '180px' }}>
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="object-contain w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-purple-100 rounded-lg">
                      <span className="text-4xl font-bold text-purple-400">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Name */}
                <h3 className="mb-1 text-base font-bold text-center text-purple-800">
                  {member.name}
                </h3>

                {/* Role */}
                <p className="mb-1 text-sm font-normal text-center text-gray-700">
                  {member.role}
                </p>

                {/* Status */}
                <p className="text-xs text-center text-gray-500">
                  {member.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
        <footer className="py-3 mt-auto text-white bg-linear-to-r from-[#CD9EFF] via-[#7A55A3] to-[#4D0699]">
          <div className="px-6 mx-auto text-center max-w-7xl">
              <p className="text-sm md:text-base">
                  IT Capstone Repository System © 2025 College of Information Technology - All Rights Reserved.
              </p>
          </div>
        </footer>
    </div>
  )
}
