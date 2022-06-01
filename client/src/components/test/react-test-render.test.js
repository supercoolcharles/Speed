import ShallowRender from 'react-test-renderer/shallow'
import App from '../ShowArticleList'
describe("react-test-render",function(){
    it("ShowArticleList name is Articles List",function(){
        const render = new ShallowRender()
        render.render(<App/>)
        console.log(render.getRenderOutput().props.children.props.children[0].props.children[0].props.children[1].props.children)
        
        expect(render.getRenderOutput().props.children.props.children[0].props.children[0].props.children[1].type).toBe("h2")
        expect(render.getRenderOutput().props.children.props.children[0]
        .props.children[0].props.children[1].props.children).toBe("Articles List")
    })
})

