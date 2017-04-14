import React, { Component } from 'react';
import PropTypes from 'prop-types';
var _ = require('lodash');

const pgLabelButtons = {
    Prev: "Previous",
    PrevDots: "PreviousDots",
    PageNo: "PageNo",
    NextDots: "NextDots",
    Next: "Next"
}

export default class Pagination extends Component {
    constructor() {
        super();

        this.state = {
            pages: [],
            currentPage: 1,
            currentPageChunk: 1
        };

        this.setPageContent = this.setPageContent.bind(this);
        this.showPaginationItem = this.showPaginationItem.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.computeNextPageNumber = this.computeNextPageNumber.bind(this);
        this.computePageChunk = this.computePageChunk.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.composePagination(nextProps);
    }

    /**
     * Computes the total number of pages depending on the received number of items and the page limit.
     * Called each time the props item changes its content
     * 
     * @param nextProps: the props object received on componentWillReceiveProps action
     */
    composePagination(nextProps) {
        var numberOfPages = Math.ceil(nextProps.total / nextProps.limit);
        var pagesToShow = _.range(1, numberOfPages + 1);
        this.setState({ pages: pagesToShow, limit: nextProps.limit });
    }

    /**
     * Computes the selected page number depending on the pagination button pressed.
     *  - Previous && Next: substract / add 1 to the current pageNumber
     *  - PrevDots & NextDots: place the page at the ending / beginnng of the previous/next chunk of page numbers
     * 
     * @param type: the type of button pressed (enum type -> pgLabelButtons)
     */
    computeNextPageNumber(type) {
        var nextPageNumber;
        switch (type) {
            case pgLabelButtons.Prev:
                nextPageNumber = this.state.currentPage - 1;
                break;
            case pgLabelButtons.PrevDots:
                nextPageNumber = (this.state.currentPageChunk - 1) * this.props.maxSize;
                break;
            case pgLabelButtons.NextDots:
                nextPageNumber = this.state.currentPageChunk * this.props.maxSize + 1;
                break;
            case pgLabelButtons.Next:
                nextPageNumber = this.state.currentPage + 1;
                break;
            default:
                return false;
        }
        return nextPageNumber;
    }

    /**
     * Computes the chunk number in which the page is located
     * 
     * @param page: current page number
     */
    computePageChunk(page) {
        return Math.ceil(page / this.props.maxSize);
    }

    /**
     * Computes the page to be selected (if it is not directly sent from the view) and calls the parent props
     * onPaginationChange to reload the requested data. 
     * Sets the new values for currentPage, currentPageChunk state properties.
     * Checks if the page number selection is valid. If not it sets the value to 0 / maxPageNumber
     * 
     * @param type: the type of button pressed (enum type -> pgLabelButtons)
     * @param selectedPage: the number of the selected page if a number button is pressed
     */
    setPageContent(type, selectedPage) {
        var page = selectedPage ? selectedPage : this.computeNextPageNumber(type);

        if (!page || page === this.state.pages.length + 1)
            return;

        if (page < 0)
            page = 1;
        else if (page > this.state.pages.length + 1)
            page = this.state.pages.length;

        this.setState({ currentPage: page, currentPageChunk: this.computePageChunk(page) });

        var offset = (page - 1) * this.props.limit;
        this.props.onPaginationChange(this.props.limit, offset);
    }

    /**
     * Checks which buttons to be shown.
     * If firstChunk -> prevDots not shown
     * If lastChunk -> nextDots not shown
     * The displayed number buttons have to belong to the current chunk
     * 
     * @param type: the type of button pressed (enum type -> pgLabelButtons)
     * @param page: the page number to be displayed
     * @returns: true if shown / false if hidden
     */
    showPaginationItem(type, page) {
        switch (type) {
            case pgLabelButtons.PrevDots:
                if (this.state.currentPage > this.props.maxSize)
                    return true;
                break;
            case pgLabelButtons.PageNo:
                var chunkOfPage = this.computePageChunk(page);
                if (chunkOfPage === this.state.currentPageChunk)
                    return true;
                break;
            case pgLabelButtons.NextDots:
                var numberOfPageChunks = Math.ceil(this.state.pages.length / this.props.maxSize);
                if (this.state.currentPageChunk < numberOfPageChunks)
                    return true;
                break;
            default:
                return false;
        }
        return false;
    }

    /**
     * Event handler for the onChange function of the selection list which holds the number of
     * items per page.
     * If the limit is changed, the page is reset to 1
     */
    handleChangeSelect(event) {
        var limit = event.target.value;
        this.setState({ limit: limit, currentPage: 1, currentPageChunk: 1 });
        this.props.onPaginationChange(limit, 0);
    }

    render() {
        return (
            <div className="row">
                <ul className="pagination float-right">

                    <li className={this.state.currentPage === 1 ? 'disabled' : ''}>
                        <a onClick={() => this.setPageContent(pgLabelButtons.Prev)}>{pgLabelButtons.Prev}</a>
                    </li>

                    {this.showPaginationItem(pgLabelButtons.PrevDots) ? <li>
                        <a onClick={() => this.setPageContent(pgLabelButtons.PrevDots)}>...</a>
                    </li> : null}

                    {this.state.pages.map((page, i) =>
                        this.showPaginationItem(pgLabelButtons.PageNo, page) ?
                            <li key={i} className={this.state.currentPage === page ? 'active' : ''}>
                                <a onClick={() => this.setPageContent(pgLabelButtons.PageNo, page)}>{page}</a>
                            </li> : null
                    )}

                    {this.showPaginationItem(pgLabelButtons.NextDots) ? <li>
                        <a onClick={() => this.setPageContent(pgLabelButtons.NextDots)}>...</a>
                    </li> : null}
                    
                    <li className={this.state.currentPage === this.state.pages.length ? 'disabled' : ''}>
                        <a onClick={() => this.setPageContent(pgLabelButtons.Next)}>{pgLabelButtons.Next}</a>
                    </li>

                    <li>
                        <span className="pagination-items">{this.props.offset + 1} - {this.props.offset + this.props.limit} of {this.props.total} items </span>
                    </li>
                </ul>
                <div className="col-md-2 pagination form-group pagination-per-page">
                    <select className="form-control" value={this.state.limit} onChange={this.handleChangeSelect} >
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                    <div> items per page</div>
                </div>
            </div>
        );
    }
}

Pagination.propTypes = {
    limit: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onPaginationChange: PropTypes.func.isRequired,
    maxSize: PropTypes.number.isRequired
};

Pagination.defaultProps = {
    limit: 20,
    offset: 0,
    total: 1,
    maxSize: 5
};