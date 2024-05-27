const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-14',
  headers: {
    authorization: '251770ae-2410-4eff-8df8-8b6fa7cd2cb4',
    'Content-Type': 'application/json'
  }
}

async function getUserInfoAndCards() {
  const userInfoAndCards = [fetch(`${config.baseUrl}/users/me`,{
    headers: config.headers,
    method:'GET',
  }),
    fetch(`${config.baseUrl}/cards`,{
    headers: config.headers,
    method: 'GET',
  })]
  try {
    const res = await Promise.all(userInfoAndCards)
    return await Promise.all(res.map((r) => {
      if (r.ok) {
        return r.json()
      }
    }))
  }
  catch (err) {
    console.log(`Произошла ошибка ${err}`);
  }
}

async function addLike(cardId) {
  try {
    const res = await fetch(`${config.baseUrl}/cards/likes/${cardId}`,{
      method: 'PUT',
      headers: config.headers,
    })
    if (res.ok) {
      return res.json();
    }
  }
  catch (err) {
    console.log(`Произошла ошибка ${err}`);
  }
}

async function deleteLike(cardId) {
  try {
    const res = await fetch(`${config.baseUrl}/cards/likes/${cardId}`,{
      method: 'DELETE',
      headers: config.headers,
    })
    if(res.ok){
      return res.json();
    }
  }
  catch (err) {
    console.log(`Произошла ошибка ${err}`);
  }
}


async function updateCardList (name, link) {
  try {
    const res = await fetch(`${config.baseUrl}/cards`, {
      method: 'POSt',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    if (res.ok){
      return res.json();
    }
  }
  catch (err) {
    console.log(`Произошла ошибка ${err}`);
  }
}

async function updateProfile (name, description) {  
  try {
    const res = await fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: description
      })
    })
    if (res.ok) {
      return res.json()
    }
  }
  catch (err) {
    console.log(`Произошла ошибка ${err}`);
  }
}

async function removeCard(_id) {
  try {
    const res = await fetch(`${config.baseUrl}/cards/${_id}`,{
      method: 'DELETE',
      headers: config.headers,
    });
    if (res.ok) {
      return res.json();
    }
  }
  catch (err) {
    console.log(`Произошла ошибка ${err}`);
  }
}

async function changeAvatarImage(link) {
  try {
    const res = await fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: link,
      })
    });
    if (res.ok) {
      return await res.json();
    }
  }
  catch (err) {
    console.log(`Произошла ошибка ${err}`);
  }
}

export { getUserInfoAndCards, addLike, updateCardList, updateProfile, deleteLike, removeCard, changeAvatarImage}