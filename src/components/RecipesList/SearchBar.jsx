import style from './SearchBar.module.css';
export default function SearchBar(props){
    return (
        <div className={style.SearchBar}>
            <div className={style.SearchBox}>
                <input type="text" />
            </div>
            <div className={style.search}>search</div>
        </div>
    )
}