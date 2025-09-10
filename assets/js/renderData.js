import projects from '../datas/projects.json' with { type: "json" };
window.onload = renderProjects('company_1')

const collapseOne = document.getElementById('collapseOne')
const collapseTwo = document.getElementById('collapseTwo')

collapseOne.addEventListener('show.bs.collapse', event => {
    renderProjects('company_1')
})

collapseTwo.addEventListener('show.bs.collapse', event => {
    renderProjects('company_2')
})

function showDataModal(company, index) {
    const modalTitle = getElement('modal_title')
    const modalContent = getElement('modal_content')
    const projectName = projects[company][index].name
    const projectDescription = projects[company][index].description
    const projectTechnologies = projects[company][index].technologies
    const projectRole = projects[company][index].role
    const projectTeamSize = projects[company][index].teamSize
    const projectResponsibility = projects[company][index].responsibility

    const htmlHeader = `${projectName}`
    const htmlContent = `
        <p><em>Role: ${projectRole} | Team size: ${projectTeamSize}</em></p>
        <p>Descriptions: <em>${projectDescription}</em></p>
        <p>Responsibilities: <em><ul>${getList(projectResponsibility)}</ul></em></p>
        <p>Technologies: <em>${projectTechnologies}</em></p>
    `

    modalTitle.innerHTML = htmlHeader
    modalContent.innerHTML = htmlContent
}

function getElement(elementId) {
    return document.getElementById(elementId)
}

function getList(data) {
    let html = ''
    data.forEach(dt => {
        html += `<li>${dt}</li>`
    })
    return html
}


function renderProjects(company) {
    const experienceEl = document.getElementById(`${company}_projects`)
    let html = ''
    projects[company].forEach((prj, index) => {
        html += `
                <li class="list-group-item active" aria-current="true">
                    <button id="item-${company}-${index}"
                        class="list-group-item list-group-item-action d-flex"
                        aria-current="true"
                        data-bs-toggle="modal" data-bs-target="#detailModal"
                    >
                        <div class="job-icon"><i class="fas fa-laptop-code"></i></div>
                        <div class="job-detail">
                            <h6 class="mb-1">${prj.name}</h6>
                        </div>
                    </button>
                </li>
            `;
    })
    experienceEl.innerHTML = html

    projects[company].forEach((prj, index) => {
        const btn = document.getElementById(`item-${company}-${index}`)
        btn.addEventListener("click", () => showDataModal(company, index))
    })
}

// <button id="item-${company}-${index}" class="list-group-item list-group-item-action d-flex" aria-current="true" data-bs-toggle="modal" data-bs-target="#exampleModal">