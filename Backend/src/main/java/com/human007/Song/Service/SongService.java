package com.human007.Song.Service;

import com.human007.Song.Model.Song;

import java.util.List;

public interface SongService {

    List<Song> getListOfSongsByName(String query) throws Exception;
}
