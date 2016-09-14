package com.infy.jnana.controller;


import java.util.List;
import java.util.Map;

import javax.ws.rs.core.MediaType;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.infy.jnana.entity.AdminEntity;
import com.infy.jnana.entity.BookmarkEntity;
import com.infy.jnana.entity.LanPathEntity;
import com.infy.jnana.entity.MyFileEntity;
import com.infy.jnana.entity.Star;
import com.infy.jnana.entity.WordCloud;
import com.infy.jnana.service.MainService;

@Controller
public class MainController {
	
	static{
	    System.out.println("Static init Controller");

	}		

	@Autowired
	private MainService mainService;
	 

    @RequestMapping(value="/",method = RequestMethod.GET)
    
    public String homepage(){
        return "firstPage";
    }
    
    
    @RequestMapping(value="/getAll",method=RequestMethod.GET,produces=MediaType.APPLICATION_JSON)
    @ResponseBody
	public List<MyFileEntity> getDocDetails(@RequestParam(value="query") String name){
		List<MyFileEntity> documentList=mainService.getData(name);
		System.out.println("controlelr is set");
		return documentList;
		
		
	}
    
    @RequestMapping(value="/saveRating",method=RequestMethod.POST)
	public @ResponseBody void saveTasks(@RequestBody Star star)
	{
		mainService.insertData(star);
	}
    
    
    @RequestMapping(value="/getWords",method=RequestMethod.GET,produces=MediaType.APPLICATION_JSON)
    @ResponseBody
    public List<WordCloud> getWords(){
    	List<WordCloud> clouds=mainService.getWords();
    	
		return clouds;
    	
    }
    
    @RequestMapping(value="/getAdmins",method=RequestMethod.GET,produces=MediaType.APPLICATION_JSON)
    @ResponseBody
    public List<AdminEntity> getAdmin(){   
    	
    	 List<AdminEntity> adminEntities=mainService.getAdmin();    	 
		return adminEntities;    	
    	
    }
    
    @RequestMapping(value="/getUsers",method=RequestMethod.GET,produces=MediaType.APPLICATION_JSON)
    @ResponseBody
	public List<AdminEntity> getUsers(@RequestParam(value="users") String users){
		List<AdminEntity> documentList=mainService.getUsers(users);
		return documentList;
	}
    
    @RequestMapping(value="/getLan",method=RequestMethod.GET,produces=MediaType.APPLICATION_JSON)
    @ResponseBody
    public List<LanPathEntity> getLanPath(@RequestParam(value="user")String user){
    	
    	List<LanPathEntity> lanPathEntities=mainService.getLanPath(user);
    	
		return lanPathEntities;
    }
    
    @RequestMapping(value="/removeLan",method=RequestMethod.DELETE,produces=MediaType.APPLICATION_JSON)
    @ResponseBody
    public void deleteLan(@RequestParam Map<String,String> requestParams){
    	
    	String user=requestParams.get("userName");
    	String path=requestParams.get("path");
    	mainService.deleteLan(user, path);
    }
    
    @RequestMapping(value="/saveLan",method=RequestMethod.POST)
  	public @ResponseBody void saveTasks(@RequestBody LanPathEntity entity)
  	{
    		mainService.saveLan(entity);
  	}
    
    @RequestMapping(value="/openDoc",method=RequestMethod.GET)
    @ResponseBody
    public void openDoc(@RequestParam(value="url")String url){
    	
    	mainService.openDoc(url);
    	
    }
    
    
    @RequestMapping(value="/saveBookmark",method=RequestMethod.POST)
	public @ResponseBody void saveBookmark(@RequestBody BookmarkEntity bookmarkEntity)
	{
		mainService.saveBookmark(bookmarkEntity);
	}
    
    @RequestMapping(value="/removeBookmark",method=RequestMethod.DELETE,produces=MediaType.APPLICATION_JSON)
    @ResponseBody
    public void removeBookmark(@RequestParam Map<String,String> requestParams){
    	
    	String user=requestParams.get("user_id");
    	String url=requestParams.get("doc_path");
    	mainService.removeBookmark(user, url);
    }
    
    @RequestMapping(value="/getBookmarks",method=RequestMethod.GET,produces=MediaType.APPLICATION_JSON)
    @ResponseBody
	public List<BookmarkEntity> getBookmarks(@RequestParam(value="user") String user){
    	
    	List<BookmarkEntity> bookmarkEntities=mainService.getBookmark(user);
    	
		return bookmarkEntities;
		
		
		
	}
}
