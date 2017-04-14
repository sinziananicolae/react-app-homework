import React, { Component } from 'react';
import PropTypes from 'prop-types';
var _ = require('lodash');

class Pagination extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pages: [],
            currentPage: 1,
            currentPageChunk: 0
        };

        this.setPageContent = this.setPageContent.bind(this);
        this.showPaginationItem = this.showPaginationItem.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.composePagination(nextProps);
    }

    composePagination(nextProps) {
        var numberOfPages = Math.ceil(nextProps.total / nextProps.limit);
        var pagesToShow = _.range(1, numberOfPages + 1);
        this.setState({pages: pagesToShow});
    }

    setPageContent(page) {
        if (!page || page === this.state.pages.length + 1)
            return;
        
        if (page < 0)
            page = 1;
        if (page > this.state.pages.length + 1)
            page = this.state.pages.length;

        this.setState({currentPage: page, currentPageChunk: Math.floor((page - 1) / this.props.maxSize)});
        this.props.onPageChange(page);
    }

    showPaginationItem(type, page) {
        switch(type){
            case "PrevDots":
                if (this.state.currentPage > this.props.maxSize)
                    return true;
                break;
            case "PageNo":
                var chunkOfPage = (Math.floor((page - 1) / this.props.maxSize));
                if ( chunkOfPage === this.state.currentPageChunk )
                    return true;
                break;
            case "NextDots":
                var numberOfPageChunks = Math.ceil(this.state.pages.length / this.props.maxSize);
                if (this.state.currentPageChunk < numberOfPageChunks - 1)
                    return true;
                break;
            default:
                return false;
        }
        return false;
    }

    render() {

        return (
            <ul className="pagination">
                <li className={this.state.currentPage === 1 ? 'disabled' : ''}>
                    <a onClick={() => this.setPageContent(this.state.currentPage - 1)}>Previous</a>
                </li>
                 { this.showPaginationItem("PrevDots") ? <li>
                    <a onClick={() => this.setPageContent(this.state.currentPage - this.props.maxSize)}>...</a>
                </li> : null}
                { this.state.pages.map((page, i) =>
                    this.showPaginationItem("PageNo", page) ?
                        <li key={i} className={this.state.currentPage === page ? 'active' : ''}>
                            <a onClick={() => this.setPageContent(page)}>{page}</a>
                        </li> : null
                )}
                {  this.showPaginationItem("NextDots") ? <li>
                    <a onClick={() => this.setPageContent(this.state.currentPage + this.props.maxSize)}>...</a>
                </li> : null}
                <li className={this.state.currentPage === this.state.pages.length ? 'disabled' : ''}>
                    <a onClick={() => this.setPageContent(this.state.currentPage + 1)}>Next</a>
                </li>
                
                <li>
                    {this.props.offset + 1} - {this.props.offset + this.props.limit} of {this.props.total} items
                </li>
            </ul>
        );
    }
}

Pagination.propTypes = {
    limit: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    maxSize: PropTypes.number.isRequired
};

Pagination.defaultProps = {
    limit: 20,
    offset: 0,
    total: 1,
    maxSize: 5
};

export default Pagination;