import { createGlobalStyle } from 'styled-components'

export const Pag = createGlobalStyle`
.pagination{
    display: flex;
    align-items: center;
    justify-content: center;
}

.paginationItem{
    background: gray;
    border: 2px solid #666;
    border-radius: 50%;
    padding: 10px 15px;
    height: 45px;
    width: 45px;
    position: relative;
    margin: 0.5px;
    cursor: pointer;
}
.paginationItem span{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.paginationItem.active{
    border: 1px solid #888;
    color: #888;
    pointer-events: none;
}
.prev,
.next{
    background: gray;
    border: none;
    padding: 10px;
    color: blue;
    margin: 0 10px;
    cursor: pointer;
}
.prev.disabled,
.next.disabled{
    pointer-events: none;
    box-shadow : none;
    color: #999;
}

`