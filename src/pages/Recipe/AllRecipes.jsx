import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Container } from 'semantic-ui-react';
import { getAllRecipes } from '../../actions/recipes/actions';
import RecipeList from '../../components/Recipe/RecipeList';

/**
 * AllRecipes component
 */
class AllRecipes extends Component {
  state = { searchField: '' };

  /**
   * @returns {undefined}
   */
  componentDidMount() {
    const { fetchAllRecipes } = this.props;
    fetchAllRecipes();
  }

  /**
   * @returns {undefined}
   * @param {Event} event
   */
  handleSearchChange = event =>
    this.setState({ searchField: event.target.value });

  /**
   * @returns {JSX.Element} All recipes component
   */
  render() {
    const { searchField } = this.state;
    const { recipes } = this.props;
    const filteredRecipes = recipes.filter(recipe => {
      return JSON.stringify(recipe).includes(searchField.toLowerCase());
    });
    return (
      <div className="recipes">
        <Container>
          <Input
            fluid
            icon="search"
            onChange={this.handleSearchChange}
            placeholder="Search..."
          />
          <RecipeList recipes={filteredRecipes} />
        </Container>
      </div>
    );
  }
}

AllRecipes.defaultProps = { recipes: [] };

AllRecipes.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({})),
  fetchAllRecipes: PropTypes.func.isRequired,
};

/**
 * @returns {object} recipes prop
 * @param {object} state
 */
const mapStateToProps = state => ({
  recipes: state.recipes.recipesReducer.recipes,
});

export default connect(
  mapStateToProps,
  { fetchAllRecipes: getAllRecipes }
)(AllRecipes);
