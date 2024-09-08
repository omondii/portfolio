/**
 * Script to fetch repository specific readme, format and display the
 * retrieved data in grids. 
 */
const projects = [
    { repoName: 'ExploreKE', imageUrl: '/static/images/ExploreKe.png', githubUrl: 'https://github.com/omondii/ExploreKE' },
    { repoName: 'EnGalactica', imageUrl: '/static/images/galaxy.png', githubUrl: 'https://github.com/omondii/EnGalactica' },
    // { repoName: 'userReg', imageUrl: '/static/images/ExploreKe.png', githubUrl: 'https://github.com/omondii/userReg' },
    // ...
];

/**
 * fetchReadme: uses the repo name to fetch readme content from the fetch_readme view
 * @param {*} repoName: Name of the repository 
 * @returns: Title: Repository name;
 * @returns: Content:First 150 lines of content
 */
async function fetchReadme(repoName) {
    try {
        const response = await fetch(`/fetch_readme/${repoName}`);
        const data = await response.json();
        if (data.title && data.content) {
            return { title: data.title, content: data.content };
        } else {
            console.error('Unexpected response format:', data);
            return { title: 'Error', content: 'Error fetching README' };
        }
    } catch (error) {
        console.error('Error fetching README:', error);
        return { title: 'Error', content: 'Error fetching README' };
    }
}

/**
 * Renders the retrieved README data in a 2*2 grid
 */
async function displayProjects() {
    const projectGrid = document.getElementById('project-grid');
    for (const project of projects) {
        const projectDetails = await fetchReadme(project.repoName);
        const projectElement = document.createElement('div');
        projectElement.classList.add('project');
        projectElement.innerHTML = `
            <img src="${project.imageUrl}" alt="${project.repoName}">
            <div class="description">
                <h3>${projectDetails.title}</h3>
                <p>${projectDetails.content.substring(0, 150)} ...</p>
            </div>
            <a href="${project.githubUrl}" target="_blank">View on GitHub</a>
        `;
        projectGrid.appendChild(projectElement);
    }
}

document.addEventListener('DOMContentLoaded', displayProjects);