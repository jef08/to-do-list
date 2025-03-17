function createProjectsDiv() {

    const projectsDiv = document.createElement('div');
    projectsDiv.id = "projects-div";
    
    const emptyDiv = document.getElementById("empty-div");
    emptyDiv.appendChild(projectsDiv);

}

export default createProjectsDiv;