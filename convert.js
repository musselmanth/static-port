const projectsList = document.querySelector('.projects-list')

const projectsListArr = Array.prototype.slice.call(projectsList.childNodes);
filteredList = projectsListArr.filter(node => {
  return(node.tagName === 'DIV')
})

const jsonList = filteredList.map(proj => {
  const linksArray = Array.prototype.slice.call(proj.querySelector('.links').childNodes)
  const filteredLinks = linksArray.filter(link => {
    return link.tagName === 'A'
  })
  const jsonLinks = filteredLinks.map(link => {
    return(
      {
        text: link.innerText,
        url: link.href
      }
    )
  })

  const sample = proj.querySelector('.screen')
  let sampleJson

  if (sample.childNodes[1].tagName === 'IFRAME') {
    sampleJson = {
      type: "video",
      src: sample.childNodes[1].src
    }
  } else {
    sampleJson = {
      type: "image",
      src: sample.childNodes[1].src.split("/").pop()
    }
  }

  const techArray = Array.prototype.slice.call(proj.querySelector('.tech-stack').childNodes)
  const filteredTech = techArray.filter(tech => {
    return tech.tagName === 'LI'
  })


  const techJson = filteredTech.map(tech => {
    const obj = {
      name: tech.innerText,
      svgString: tech.childNodes[0].outerHTML
    }
    return obj
  })

  const description = proj.querySelector('.description').innerHTML



  const obj = {
    title: proj.querySelector('.proj-title').innerText,
    links: jsonLinks,
    sample: sampleJson,
    techStack: techJson,
    description: description
  }
  return obj
})

console.log(jsonList)