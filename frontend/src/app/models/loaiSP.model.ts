export class loaiSP{
    category_id=0;
    category_name="";
    }
export interface ApiLoaiSP {
    message: string; 
    status: number;   
    list: loaiSP[];    
    };

    export class productCategory{
       
        product_id=0;
        product_name= "";
        product_quantity= 0;
        product_sold= "";
        product_slug="";
        category_id= 0;
        brand_id= 0;
        product_desc= "";
        product_content= "";
        product_price= "";
        product_image= "";
        product_status= 0;
        created_at= "";
        updated_at= "";
        }
    export interface ApiSanPhamLoai {
        message: string;   
        status: number;    
        list: productCategory[];    
        }