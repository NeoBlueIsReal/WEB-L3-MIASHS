import React from "react";

class Cards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:3001/cards")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                // Remarque : il est important de traiter les erreurs ici
                // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
                // des exceptions provenant de réels bugs du composant.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Chargement…</div>;
        } else {
            return (
                items.map(item => (
                    <Card key={item.key} id={item.key} name={item.name} info={item.info} />
                ))
            );
        }
    }
}

class Card extends React.Component {
    // this.handleClick(champion.id) : () => {}
    render() {
        return (
            <article className="card col-4 mx-auto">
                <img classname="img-fluid col-4" src={"https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + this.props.id + "_0.jpg"} alt="Cannot fetch img"></img>
                <div className="col-4">
                    <p>Attaque: {this.props.info.attack}</p>
                    <p>Attaque: {this.props.info.defense}</p>
                </div>
                <footer>{this.props.name}</footer>
            </article>
        )
    }
}


export default Cards;