import {expect, test} from '@playwright/test'

var userid;

test.describe('REST API Tests with ReqRes', () => {

test('apiGet',async ({request}) => {
    const response = await request.get('https://reqres.in/api/users?page=2')
    console.log(await response.json())
    expect(response.status()).toBe(200)
});

test('apiPost',async ({request}) => {
    const response = await request.post('https://reqres.in/api/users',

                                         {
                                            data:{"name":"Deepak","job":"QA" },
                                            headers:{"Accept":"application/json "}
                                        });
    console.log(await response.json())
    expect(response.status()).toBe(201)   
    
    var ser = await response.json();
    userid=ser.id
})

test('apiPut',async ({request}) => {
    const response = await request.put('https://reqres.in/api/users/'+userid,

        {
            data:{"name":"Deepak","job":"Billionaire" },
            headers:{"Accept":"application/json "}
        });

    console.log(await response.json())
    expect(response.status()).toBe(200)   

})

    test('apiDelete',async ({request}) => {
     await request.delete('https://reqres.in/api/users/'+userid)

    })

});