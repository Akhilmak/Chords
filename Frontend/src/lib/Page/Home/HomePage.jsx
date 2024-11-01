import React, { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MagnifyingGlassIcon, VideoIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { getSongsFromQuery } from "@/lib/State/SongSearch/Action";
import { useDispatch } from "react-redux";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";


const HomePage = () => {
  
  const [query,setQuery]=useState('');
  const[songs,setSongs]=useState([]);
  const [audio, setAudio] = useState(null); 
  const [playingSong, setPlayingSong] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const dispatch=useDispatch();
  const handleSearch=async ()=>{
    if(query.trim()){
      const fetchedSongs=await dispatch(getSongsFromQuery(query));
      console.log(fetchedSongs)
      setSongs(fetchedSongs);
    }
  }

  const handleSongClick = (song) => {
    setSelectedSong(song); // Set the selected song
  };

  const playSong = (song) => {
    if (audio) {
      audio.pause();
    }

    const newAudio = new Audio(song.downloadUrl);
    newAudio.play();
    setAudio(newAudio);
    setPlayingSong(song);

    newAudio.onended = () => {
      setAudio(null);
      setPlayingSong(null);
    };
  };

  const pauseSong = () => {
    if (audio) {
      audio.pause();
      setPlayingSong(null); 
    }
  };

  const formatDuration = (durationInSeconds) => {

  
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };
  return (
    <div className="sticky   top-0 left-0 right-0 p-5 items-center">
      <div className="flex  flex-col justify-between items-center">
        <span className="flex gap-4 justify-between cursor-pointer">
          <p className="text-5xl font-bold">Player</p>
          <VideoIcon className="size-11 mt-3" />
        </span>
      </div>
      <div className="ie">
        <div className="p-5 flex items-center"></div>
        <Dialog className="items-center content-center">
      <DialogTrigger >
        <Button variant="ghost" className="rounded-full p-5 ">
          <MagnifyingGlassIcon style={{width:'3rem', height:'3rem'}} className="p-2.5"/>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center ">
        <DialogHeader className="">
          <DialogTitle>Search For a Song</DialogTitle>
        </DialogHeader>
        <div className=" p-5 w-full">
          <div className=" items-center gap-4 ">
            <Input id="name"  className="w-full" value={query} onChange={(e)=>setQuery(e.target.value)}/>
          </div>
        </div>
        <DialogFooter >
          <Button type="submit" onClick={handleSearch} className="text-l text-gray-200 h-auto bg-blue-600">Search</Button>
        </DialogFooter>
        <div className="songs-list w-full p-5">
              {songs.length > 0 ? (
                songs.map((song, index) => (
                  <div
                    key={index}
                    className="song-item mb-2 flex gap-5 items-center cursor-pointer"
                    onClick={() => handleSongClick(song)} // Open the new dialog on click
                  >
                    <Avatar>
                      <AvatarImage src={song.imageUrl} alt={`${song.name} cover`} />
                    </Avatar>
                    <h4 className="text-lg">{song.name}</h4>
                  </div>
                ))
              ) : (
                <p>No songs found.</p>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* New Dialog for Playing Selected Song */}
        <Dialog open={!!selectedSong} onOpenChange={() => setSelectedSong(null)}>
          <DialogContent className="flex flex-col items-center">
            <DialogHeader>
              <DialogTitle>{selectedSong?.name}</DialogTitle>
            </DialogHeader>
            <div className="p-5 w-full">
              <Avatar>
                <AvatarImage src={selectedSong?.imageUrl} alt={`${selectedSong?.name} cover`} />
              </Avatar>
              <p>{formatDuration(selectedSong?.duration)}</p> {/* Assuming you have a duration property */}
            </div>
            <div>
              <Progress
                value={33}
              />
            </div>
            <div className="flex gap-4">
              <Button onClick={() => playSong(selectedSong)} className="bg-green-600 text-white">
                Play
              </Button>
              <Button onClick={() => pauseSong()} className="bg-red-600 text-white">
                Pause
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default HomePage;