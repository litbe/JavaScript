<?php
/**
 * Zend Framework
 *
 * LICENSE
 *
 * This source file is subject to the new BSD license that is bundled
 * with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://framework.zend.com/license/new-bsd
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@zend.com so we can send you a copy immediately.
 *
 * @category   Zend
 * @package    Zend_Search_Lucene
 * @subpackage Search
 * @copyright  Copyright (c) 2005-2007 Zend Technologies USA Inc. (http://www.zend.com)
 * @license    http://framework.zend.com/license/new-bsd     New BSD License
 */


/** Zend_Search_Lucene_Search_Query */
require_once 'Zend/Search/Lucene/Search/Query.php';

/** Zend_Search_Lucene_Search_Weight_Empty */
require_once 'Zend/Search/Lucene/Search/Weight/Empty.php';


/**
 * @category   Zend
 * @package    Zend_Search_Lucene
 * @subpackage Search
 * @copyright  Copyright (c) 2005-2007 Zend Technologies USA Inc. (http://www.zend.com)
 * @license    http://framework.zend.com/license/new-bsd     New BSD License
 */
class Zend_Search_Lucene_Search_Query_Empty extends Zend_Search_Lucene_Search_Query
{
    /**
     * Re-write query into primitive queries in the context of specified index
     *
     * @param Zend_Search_Lucene $index
     * @return Zend_Search_Lucene_Search_Query
     */
    public function rewrite(Zend_Search_Lucene $index)
    {
        return $this;
    }

    /**
     * Optimize query in the context of specified index
     *
     * @param Zend_Search_Lucene $index
     * @return Zend_Search_Lucene_Search_Query
     */
    public function optimize(Zend_Search_Lucene $index)
    {
        // "Empty" query is a primitive query and don't need to be optimized
        return $this;
    }

    /**
     * Constructs an appropriate Weight implementation for this query.
     *
     * @param Zend_Search_Lucene $reader
     * @return Zend_Search_Lucene_Search_Weight
     */
    public function createWeight($reader)
    {
        return new Zend_Search_Lucene_Search_Weight_Empty();
    }

    /**
     * Execute query in context of index reader
     * It also initializes necessary internal structures
     *
     * @param Zend_Search_Lucene $reader
     */
    public function execute($reader)
    {
        // Do nothing
    }

    /**
     * Get document ids likely matching the query
     *
     * It's an array with document ids as keys (performance considerations)
     *
     * @return array
     */
    public function matchedDocs()
    {
        return array();
    }

    /**
     * Score specified document
     *
     * @param integer $docId
     * @param Zend_Search_Lucene $reader
     * @return float
     */
    public function score($docId, $reader)
    {
        return 0;
    }

    /**
     * Return query terms
     *
     * @return array
     */
    public function getQueryTerms()
    {
        return array();
    }

    /**
     * Highlight query terms
     *
     * @param integer &$colorIndex
     * @param Zend_Search_Lucene_Document_Html $doc
     */
    public function highlightMatchesDOM(Zend_Search_Lucene_Document_Html $doc, &$colorIndex)
    {
        // Do nothing
    }

    /**
     * Print a query
     *
     * @return string
     */
    public function __toString()
    {
        return '<EmptyQuery>';
    }
}

