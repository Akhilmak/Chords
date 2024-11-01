package com.human007.Song.Controller;

import com.human007.Song.Model.Song;
import com.human007.Song.Service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/search")
public class mainController {

    @Autowired
    private SongService songService;

    @GetMapping("/songs/{query}")
    ResponseEntity<List<Song>> search(@PathVariable  String query) throws Exception{
        List<Song> res=songService.getListOfSongsByName(query);
        return ResponseEntity.ok(res);
    }
}
