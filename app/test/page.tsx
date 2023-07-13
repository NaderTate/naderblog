import Prism from "prismjs";
// This is the css file for the theme, it can be edited by going to node_modules\prismjs\themes or you can import a different theme from the same folder
import "prismjs/themes/prism-coy.css";
const codeBlock =
  "const myFunction = () => { \n console.log(`hello world`) \n }";
function page() {
  return (
    <div>
      <pre className="dark:bg-gray-900 bg-gray-100 p-3 rounded-md overflow-auto ">
        <code
          dangerouslySetInnerHTML={{
            __html: Prism.highlight(
              codeBlock,
              Prism.languages.javascript,
              "javascript"
            ),
          }}
        />
      </pre>
    </div>
  );
}

export default page;
