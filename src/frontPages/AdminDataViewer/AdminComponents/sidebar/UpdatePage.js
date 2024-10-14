import React from 'react';
import DataTable from 'react-data-table-component'; 


function UpdatePage(){

    const columnSample = [

        {
            name: "ID", 
            selector: row => row.id,
            sortable: true, 
            selectable: true
        }, 
        
        {	name: "Sender Name", 
            selector: row => row.senderName,
            sortable: true 
        }, 

        {	name: "Receiver Name", 
            selector: row => row.receiverName,
            sortable: true 
        }, 

        {	name: "Items", 
            selector: row => row.items,
            sortable: true 
        }, 

        {	name: "Date Ordered", 
            selector: row => row.date_ordered,
            sortable: true 
        }, 

        {	name: "No. of Boxes", 
            selector: row => row.no_of_boxes 
        }, 

        {	name: "Box Size", 
            selector: row => row.box_size 
        }, 

        {	name: "Weight", 
            selector: row => row.weight 
        }, 

        {	name: "Date Loaded", 
            selector: row => row.date_loaded,
            sortable: true
        }
        
    ];

    const data =
    [
            { id: "1001", senderName : "Alice", receiverName: "Tom", items: "Electronics", date_ordered: "2021-09-01", no_of_boxes: 2, box_size: "Medium", weight: "5kg", TrackingStatus: "Fragile", date_loaded: "2021-09-02" },
            { id: "1002", senderName : "Bob", receiverName: "Jerry", items: "Books", date_ordered: "2021-09-03", no_of_boxes: 3, box_size: "Small", weight: "8kg", TrackingStatus: "Handle with care", date_loaded: "2021-09-04" },
            { id: "1003", senderName : "Charlie", receiverName: "Leo", items: "Clothes", date_ordered: "2021-09-05", no_of_boxes: 1, box_size: "Large", weight: "2kg", TrackingStatus: "Urgent", date_loaded: "2021-09-06" },
            { id: "1004", senderName : "Dana", receiverName: "Max", items: "Furniture", date_ordered: "2021-09-07", no_of_boxes: 2, box_size: "Extra Large", weight: "20kg", TrackingStatus: "No rush", date_loaded: "2021-09-08" },
            { id: "1005", senderName : "Eve", receiverName: "Nora", items: "Garden supplies", date_ordered: "2021-09-09", no_of_boxes: 2, box_size: "Medium", weight: "15kg", TrackingStatus: "Waterproof", date_loaded: "2021-09-10" },
            { id: "1006", senderName : "Frank", receiverName: "Olive", items: "Sporting goods", date_ordered: "2021-09-11", no_of_boxes: 1, box_size: "Large", weight: "12kg", TrackingStatus: "Handle with care", date_loaded: "2021-09-12" },
            { id: "1007", senderName : "Grace", receiverName: "Peter", items: "Art supplies", date_ordered: "2021-09-13", no_of_boxes: 4, box_size: "Small", weight: "9kg", TrackingStatus: "Fragile", date_loaded: "2021-09-14" },
            { id: "1008", senderName : "Henry", receiverName: "Quinn", items: "Home appliances", date_ordered: "2021-09-15", no_of_boxes: 1, box_size: "Extra Large", weight: "25kg", TrackingStatus: "Urgent", date_loaded: "2021-09-16" },
            { id: "1009", senderName : "Ivy", receiverName: "Rachel", items: "Musical instruments", date_ordered: "2021-09-17", no_of_boxes: 2, box_size: "Medium", weight: "10kg", TrackingStatus: "No rush", date_loaded: "2021-09-18" },
            { id: "1010", senderName : "Jack", receiverName: "Steve", items: "Computer hardware", date_ordered: "2021-09-19", no_of_boxes: 3, box_size: "Large", weight: "18kg", TrackingStatus: "Handle with care", date_loaded: "2021-09-20" },
            { id: "1011", senderName : "Kara", receiverName: "Tim", items: "Office supplies", date_ordered: "2021-09-21", no_of_boxes: 2, box_size: "Small", weight: "6kg", TrackingStatus: "Fragile", date_loaded: "2021-09-22" },
            { id: "1012", senderName : "Liam", receiverName: "Uma", items: "Toys", date_ordered: "2021-09-23", no_of_boxes: 2, box_size: "Medium", weight: "7kg", TrackingStatus: "Waterproof", date_loaded: "2021-09-24" },
            { id: "1013", senderName : "Mona", receiverName: "Vince", items: "Kitchenware", date_ordered: "2021-09-25", no_of_boxes: 1, box_size: "Large", weight: "5kg", TrackingStatus: "Urgent", date_loaded: "2021-09-26" },
            { id: "1014", senderName : "Ned", receiverName: "Walt", items: "Decorations", date_ordered: "2021-09-27", no_of_boxes: 3, box_size: "Extra Large", weight: "20kg", TrackingStatus: "No rush", date_loaded: "2021-09-28" },
            { id: "1015", senderName : "Ola", receiverName: "Xena", items: "Automotive parts", date_ordered: "2021-09-29", no_of_boxes: 2, box_size: "Medium", weight: "13kg", TrackingStatus: "Handle with care", date_loaded: "2021-09-30" },
            { id: "1016", senderName : "Pablo", receiverName: "Yolanda", items: "Healthcare products", date_ordered: "2021-10-01", no_of_boxes: 2, box_size: "Small", weight: "3kg", TrackingStatus: "Fragile", date_loaded: "2021-10-02" },
            { id: "1017", senderName : "Quincy", receiverName: "Zane", items: "Building materials", date_ordered: "2021-10-03", no_of_boxes: 1, box_size: "Extra Large", weight: "30kg", TrackingStatus: "Urgent", date_loaded: "2021-10-04" },
            { id: "1018", senderName : "Rita", receiverName: "Andy", items: "Fashion accessories", date_ordered: "2021-10-05", no_of_boxes: 3, box_size: "Medium", weight: "8kg", TrackingStatus: "Waterproof", date_loaded: "2021-10-06" },
            { id: "1019", senderName : "Sam", receiverName: "Bella", items: "Photography equipment", date_ordered: "2021-10-07", no_of_boxes: 2, box_size: "Large", weight: "11kg", TrackingStatus: "Handle with care", date_loaded: "2021-10-08" },
            { id: "1020", senderName : "Tina", receiverName: "Carlos", items: "Food products", date_ordered: "2021-10-09", no_of_boxes: 1, box_size: "Small", weight: "2kg", TrackingStatus: "Fragile", date_loaded: "2021-10-10" }
    ];

    return(
        <div id="container-update">
            <DataTable 
                columns={columnSample}
                data={data}  
            >
            </DataTable> 
        </div>
    )

}



export default UpdatePage;

