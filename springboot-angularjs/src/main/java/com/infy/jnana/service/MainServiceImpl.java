package com.infy.jnana.service;


import java.io.File;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.apache.commons.io.FilenameUtils;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServer;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrServer;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infy.jnana.dao.MainDAO;
import com.infy.jnana.entity.AdminEntity;
import com.infy.jnana.entity.BookmarkEntity;
import com.infy.jnana.entity.LanPathEntity;
import com.infy.jnana.entity.MyFileEntity;
import com.infy.jnana.entity.Star;
import com.infy.jnana.entity.WordCloud;



@Service
public class MainServiceImpl implements MainService {
	
	@Autowired
	private MainDAO mainDAO;
		
		@Override
		public List<MyFileEntity> getData(String name) {
			MyFileEntity myFileEntity = null;
			List<MyFileEntity> fileEntities = new ArrayList<MyFileEntity>();

			SolrServer solr = new HttpSolrServer("http://10.95.199.155:8983/solr/star/");
			SolrQuery sq = new SolrQuery();
			String key = name;
			sq.setQuery(key);
			sq.setSort("id",SolrQuery.ORDER.desc);
			List<String> myLabelList = new ArrayList<String>();
			myLabelList.add("id");
			myLabelList.add("title");
			myLabelList.add("author");
			myLabelList.add("url");
			myLabelList.add("text");
			myLabelList.add("date");
			
			try {
				QueryResponse rsp = solr.query(sq);
				SolrDocumentList docs = rsp.getResults();
				ListIterator<SolrDocument> iter = docs.listIterator();
				mainDAO.saveKey(key);
				while (iter.hasNext()) {

					myFileEntity = new MyFileEntity();
					SolrDocument doc = iter.next();
					Map<String, Collection<Object>> values = doc
							.getFieldValuesMap();
					Iterator<String> labels = doc.getFieldNames().iterator();
					while (labels.hasNext()) {
						String Labelkey = labels.next();
						if (myLabelList.contains(Labelkey)) {
							Collection<Object> myValueObject = values.get(Labelkey);

							Iterator myIter = myValueObject.iterator();
							while (myIter.hasNext()) {
								Object obj = myIter.next();
								String myContent = obj.toString();
								 if("id".equalsIgnoreCase(Labelkey)){
									myFileEntity.setId(myContent);
									String ids=myContent;
									System.out.println(ids);
										
									}
								 else if ("url".equalsIgnoreCase(Labelkey)) {
									String url= myContent;		
									String type=FilenameUtils.getExtension(url);
									File file=new File(url);
									double size=file.length();
									double sizeKb=size/1024;
									double finalZize=Math.round(sizeKb*100.0)/100.0;
									String totSize=String.valueOf(finalZize+" kb");
									String user_id="inf@global";
									int docStatus=mainDAO.getStatus(user_id, url);
									myFileEntity.setUrl(myContent);
									myFileEntity.setFileType(type);		
									myFileEntity.setFileSize(totSize);
									myFileEntity.setStatus(docStatus);
									System.out.println("url :  "+url);	
									System.out.println("size" +totSize);
								}
								 
								 else if("title".equalsIgnoreCase(Labelkey)){
									 String titles=myContent;									
									 String fullName=FilenameUtils.getBaseName(titles);									 
									 myFileEntity.setFileName(fullName);
									 int avgRatings=mainDAO.find(fullName);
									 int rateCount=mainDAO.getRating(fullName);
									 myFileEntity.setAvgRating(avgRatings);
									 myFileEntity.setRateCount(rateCount);								 
								 }	
								 else if("date".equalsIgnoreCase(Labelkey)){
									 
									 String date=myContent;
									 myFileEntity.setDate(date);
								 }
								
								else if("author".equalsIgnoreCase(Labelkey)){
									String authors=myContent;
									
									if(authors==null){
										 String noAuthor="No Author found for the file";
										 myFileEntity.setFileName(noAuthor);
									 }
									else{										
										myFileEntity.setAuthor(myContent);
										System.out.println(myContent);
									}
								}
								
								 else if("text".equalsIgnoreCase(Labelkey)) {						 
									 System.out.println(myContent);	
									 String sentence="";
									 String fullContent=myContent.toLowerCase().replaceAll("[\r\n]+", "\n").replace("\n", " ");
									 System.out.println(fullContent);
									 String keyLower=key.toLowerCase();
									 
									 String paragraph = fullContent;
									 if(!(paragraph.endsWith("."))){
										 
										 paragraph=paragraph+".";
										 
									 }
								       // Pattern pattern = Pattern.compile("([A-Z][^.?!]*?)?(?<!\\w)(?i)(dog|cat|leopard)(?!\\w)[^.?!]*?[.?!]{1,2}\"?");
									 Pattern pattern = Pattern.compile("[^.!?,;]*("+key+")[^.?!;]*[.?,!]");
									 Matcher match = pattern.matcher(paragraph);
									 int countss=0;
								        while (match.find()) {
								        	if(countss<1){
								        		 System.out.println(match.group());
										            sentence=match.group();	
								        		
								        	}
								        	countss +=1;				        
								        }if(sentence.length()<=10){
								        	
								        	
								        }else{
								        myFileEntity.setSentence(sentence);
								        }
									 
									
			
									    Pattern p = Pattern.compile(keyLower);
									    Matcher m = p.matcher(fullContent);
									    int count = 0;
									    while (m.find()){
									    	count +=1;
									    }
									   if(count==0){
										
										   myFileEntity.setCount(0);
									   }else{
										   
									   
										   int counts=count;
									    myFileEntity.setCount(counts);
									    System.out.println("count :  "+counts);
									   }
									   myFileEntity.setContent(myContent);

									}
								}

							}
						}
					fileEntities.add(myFileEntity);
					}
				
				
			} catch (SolrServerException e) {
				e.printStackTrace();
				
			}
			return fileEntities;
			
		}
		
		
		@Override
		public void insertData(Star star) {
			
			mainDAO.insertData(star);
		}


		@Override
		public List<WordCloud> getWords() {
			
			List<WordCloud> clouds=new ArrayList<WordCloud>();
			
			clouds=mainDAO.getWords();
			
			return clouds;
			
			
		}


		@Override
		public List<AdminEntity> getAdmin() {
			
			List<AdminEntity> adminEntities=new ArrayList<AdminEntity>();
			
			adminEntities=mainDAO.getAdmin();
			
			return adminEntities;
		}


		@Override
		public List<AdminEntity> getUsers(String users) {
			
			List<AdminEntity> adminEntities=new ArrayList<AdminEntity>();
			adminEntities=mainDAO.getUsers(users);
						
			return adminEntities;
		}


		@Override
		public List<LanPathEntity> getLanPath(String user) {
			
			List<LanPathEntity> lanPathEntities=mainDAO.getLanPath(user);	
			
			return lanPathEntities;
		}


		@Override
		public void deleteLan(String user,String path) {
			
		mainDAO.deleteLan(user, path);
		
		}


		@Override
		public void saveLan(LanPathEntity entity) {
			
			
			mainDAO.saveLan(entity);
			
		}


		@Override
		public void openDoc(String url) {
		
			/*   //text file, should be opening in default text editor
	        File file = new File(url);
	        
	        //first check if Desktop is supported by Platform or not
	        if(!Desktop.isDesktopSupported()){
	            System.out.println("Desktop is not supported");
	            return;
	        }
	        
	        Desktop desktop = Desktop.getDesktop();
	        if(file.exists())
				try {
					desktop.open(file);
				} catch (IOException e) {
					
					e.printStackTrace();
				}*/
		     File file = new File(url);
			 try{

		            if (file.exists()) {

		                Process p = Runtime
		                   .getRuntime()
		                   .exec("rundll32 url.dll,FileProtocolHandler "+file);
		                p.waitFor();

		            } else {

		                System.out.println("File does not exist");

		            }

		          } catch (Exception ex) {
		            ex.printStackTrace();
		          }
		}


		@Override
		public void saveBookmark(BookmarkEntity bookmarkEntity) {
			
			mainDAO.saveBookmark(bookmarkEntity);
			
		}


		@Override
		public void removeBookmark(String user_id, String doc_url) {
			
			mainDAO.removeBookmark(user_id, doc_url);
			
		}


		@Override
		public List<BookmarkEntity> getBookmark(String user) {
			
			List<BookmarkEntity> bookmarkEntity=mainDAO.getBookmark(user);
			
			return bookmarkEntity;
		}


		
			
		
		
		

}
