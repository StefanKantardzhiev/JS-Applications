import * as api from '../../api.js'


export const login = api.login
export const logout = api.logout
export const register = api.register

export async function getAll(){
    return api.get('/data/offers?sortBy=_createdOn%20desc')
}
export async function getOffersById(id){
    return api.get('/data/offers/'+id)
}

export async function getMyOffers(userId){
    return  api.get(`/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`);

}
export async function createOffer(offer){
    return api.post('/data/offers',offer);
}

export async function editOffer(id,offer){
    return api.put('/data/offers/'+id,offer)
}

export async function deleteOffer(id){
    return api.del('/data/offers/'+id)
}


// //likes below
// export async function likeBook(bookId){
//     return api.post('/data/likes',{
//         bookId
//     })
// }

// export async function getLikesBuyBookId(bookId){
//     return api.get(`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`);
// }
//  export async function getMyLikeByBookId(bookId,userId){
//     return api.get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
//  }
