const USER = 'https://jsonplaceholder.typicode.com/users'
const usersId = [5, 6, 2, 1]
const dataContainer = document.querySelector('#data-container')

const createUserElement = (text)=>{
    const userElement = document.createElement('li')
    const userElementAnchor = document.createElement('a')
    userElementAnchor.href = '#'
    userElementAnchor.textContent = text
    userElement.append(userElementAnchor)
    return userElement
}
const hidden = ()=>{
  const hiddenHTML = document.querySelector('#loader')
  const isHidden = hiddenHTML.hasAttribute('hidden')
  if(isHidden){
    hiddenHTML.removeAttribute('hidden')
  } else {hiddenHTML.setAttribute('hidden', '')}
}

const getUsersByIds = (ids)=>{
  hidden ()
  const requests = ids.map((id)=>fetch(`${USER}/${id}`))
  Promise.all(requests)
  .then((responses)=>{
    const dataResults = responses.map((response)=>response.json())
    return Promise.all(dataResults)
  })
  .then((user)=>{
    console.log('user', user)
    user.forEach((user)=>{
    const userHTML = createUserElement(user.name)
    dataContainer.append(userHTML)
  })
  })
  .catch((err)=>{
    console.log('err', err);
  })
  .finally(()=>{
    hidden ()
    console.log('Завершение кода');
  }) 
}
getUsersByIds(usersId)

