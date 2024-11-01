package com.human007.Song.Implementation;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.human007.Song.Model.Song;
import com.human007.Song.Service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;


@Service
public class SongServiceImpl implements SongService {

    @Autowired
    private ObjectMapper objectMapper;
    private String baseUrl="https://saavn.dev/api";
    @Override
    public List<Song> getListOfSongsByName(String query) throws Exception{
        String url=baseUrl+"/search/songs?query=/"+query;
        RestTemplate restTemplate=new RestTemplate();
        try {
            HttpHeaders headers=new HttpHeaders();
            HttpEntity<String> entity=new HttpEntity<>(headers);

            ResponseEntity<String> response=restTemplate.exchange(url, HttpMethod.GET,entity,String.class);

            System.out.println(response.getBody());
            JsonNode root=objectMapper.readTree(response.getBody());

            JsonNode resultNode=root.get("data").get("results");

            List<Song> songs = new ArrayList<>();

            for (JsonNode res : resultNode) {
                Song song = new Song();
                song.setId(res.get("id").asText());
                song.setName(res.get("name").asText());
                song.setYear(res.has("year") ? res.get("year").asLong() : null);
                song.setDuration(res.has("duration") ? res.get("duration").asLong() : null);
                song.setHasLyrics(res.get("hasLyrics").asBoolean());
                // Set imageUrl - assuming you want to take the first image URL available
                if (res.has("image") && res.get("image").isArray() && !res.get("image").isEmpty()) {
                    song.setImageUrl(res.get("image").get(2).get("url").asText()); // Get the fHighest Quality image
                }

                if (res.has("downloadUrl") && res.get("downloadUrl").isArray() && !res.get("downloadUrl").isEmpty()) {
                    song.setDownloadUrl(res.get("downloadUrl").get(2).get("url").asText()); // Get the first download URL
                }

                songs.add(song);
            }
            return songs;
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }
}
