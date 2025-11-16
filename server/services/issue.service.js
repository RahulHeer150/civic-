const IssueModel =require("../models/issue.model");

module.exports.createIssue=async({
    title, description,location, media, reportedBy
})=>{
    if(!title || !description || ! location ||!media){
        throw new Error(" All fields are Required.")
    }
    
        const issue=IssueModel.create({
            title,
            description,
            location,
            media:media,
            reportedBy:reportedBy||undefined,
        })
        return issue;
  
}

