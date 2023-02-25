
const apiKey = '5cMBTYYzqq7QCS7LFumA_Uv9n_YDFj9ldjbrFH7O1H-lnWZbn0YRuFFBSwK3GFDRSelQfcVYfr1-aF9H4ySemFK14ecjFUJlxe9qKC3OffC3lfIzypps_33iLuTlY3Yx'

const Yelp = {
    search: (term, location, sortBy) => {
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                }
            }
        )
        .then((response) => response.json())
        .then((jsonResponse) =>{
            /* if the response json object has a key called 'businesses', which should be 
                an array that is not empty, then return an array of business object with all the 
                key values below
                example json response from Yelp API: https://docs.developer.yelp.com/docs/fusion-intro
            */
            if (Array.isArray(jsonResponse?.businesses) && jsonResponse?.businesses?.length) {
                return jsonResponse.businesses.map((business) => (
                    /* the keys of business object should match with the one in Homepage */
                    {   
                        id: business.id,
                        imageSrc : business.imageSrc,
                        name: business.name,
                        address: business.address,
                        city: business.city,
                        state: business.state,
                        zipCode: business.zipCode,
                        category: business.category,
                        rating: business.rating,
                        reviewCount: business.reviewCount
                    }
                ))
            }else{ /* if no business found, return empty array */
                return []
            }
        })
        .catch((err) => {
            console.log(err, 'any errors')
        }) 
    }

}

export default Yelp