package com.human007.Song.Model;

import lombok.Data;

import java.util.List;


@Data
public class Song {
    private String id;
    private String name;
    private Long year;
    private Long duration;
    private boolean hasLyrics;
    private String imageUrl;
    private String downloadUrl;

}
