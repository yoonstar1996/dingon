const Sequelize = require("sequelize");


module.exports = class PostMedia extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            src:{
                type:Sequelize.STRING(1000),
                allowNull:false
            },
            type:{
                type:Sequelize.STRING(100),
                allowNull:false
            }

        },{
            sequelize,
            timestamps:true,
            underscored:false,
            modelName:"PostMedia",
            tableName:"postmedia",
            paranoid:false,
            charset:"utf8mb4",
            collate:"utf8mb4_general_ci"
        });
    }
    static associate(db){
        db.PostMedia.belongsTo(db.Post,{foreignKey:"postId",sourceKey:"id",onDelete:"cascade",onUpdate:"cascade"});
       
    }
}