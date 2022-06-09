import { Test } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm"
import { Post } from "./entities"
import { PostService } from "./post.service"



describe("Testing Post Service", ()=>{
    let postService : PostService;
    beforeEach(async () => {
        
        const module = await Test.createTestingModule({
            providers:[
                PostService,
                {
                    provide: getRepositoryToken(Post),
                    useValue: {}
                }
            ]
        })
        .compile();

        postService = await module.get<PostService>(PostService);
    });

    describe("Testing",()=>{
        it("testing getById",()=>{
            expect(typeof postService.getById(1)).not.toEqual(null)
        })
    })

})