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

    it("delete",function(){
        const app = ReactTestUtil.renderIntoDocument(<App/>)
        let todoitems = ReactTestUtil.scryRenderedDOMComponentsWithTag(app,"li")
        console.log(todoitems.length)

        let detelteButton = todoitems[0].querySelector("button")

        ReactTestUtil.Simulate.click(detelteButton)

        let todoitemsAfterClick = ReactTestUtil.scryRenderedDOMComponentsWithTag(app,"li")

        expect(todoitems.length-1).toBe(todoitemsAfterClick.length)
    })

    it("add",function(){
        const app = ReactTestUtil.renderIntoDocument(<App/>)
        let todoitems = ReactTestUtil.scryRenderedDOMComponentsWithTag(app,"li")
        console.log(todoitems.length)


        let addInput = ReactTestUtil.scryRenderedDOMComponentsWithTag(app,"input")
        addInput.value = "kerwinaaaaaa"
        let addButton = ReactTestUtil.findRenderedDOMComponentWithClass(app,"add")

        ReactTestUtil.Simulate.click(addButton)

        let todoitemsAfterClick = ReactTestUtil.scryRenderedDOMComponentsWithTag(app,"li")

        expect(todoitemsAfterClick.length).toBe(todoitems.length+1)

    })
})

